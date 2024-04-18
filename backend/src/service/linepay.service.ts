import { Request, Response } from 'express';
import Base64 from 'crypto-js/enc-base64';
import { v4 as uuidv4 } from 'uuid';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import axios from 'axios';
import { pool } from '@/models/init';
import { env } from '@/utils/env';

const createSignature = (uri: string, linePayBody: any) => {
  const nonce = Date.now();
  const encrypt = `${env.LINE_PAY_SECRET}/${env.LINE_PAY_VERSION}${uri}${JSON.stringify(
    linePayBody
  )}${nonce}`;
  const signature = Base64.stringify(hmacSHA256(encrypt, env.LINE_PAY_SECRET));
  const headers = {
    'Content-Type': 'application/json',
    'X-LINE-ChannelId': env.LINE_PAY_CHANNELID,
    'X-LINE-Authorization-Nonce': nonce,
    'X-LINE-Authorization': signature,
  };
  return headers;
};

export const createLinepayOrder = async (req: Request, _res: Response) => {
  const { activity_id } = req.body;
  const { member_id, member_role } = req.user as any;

  const query = `
    SELECT student_fee, non_student_fee, title 
    FROM activity 
    WHERE activity_id = $1
  `;
  const values = [activity_id];
  const result = await pool.query(query, values);

  const fee =
    member_role === 'Student' ? result.rows[0].student_fee : result.rows[0].non_student_fee;

  const order_id = uuidv4();
  const query2 = `
    INSERT INTO orders (order_id, fee, member_id, activity_id)
    VALUES ($1, $2, $3, $4)
  `;
  const values2 = [order_id, fee, member_id, activity_id];
  await pool.query(query2, values2);

  const order = {
    amount: fee,
    currency: 'TWD',
    orderId: order_id,
    packages: [
      {
        id: activity_id,
        amount: fee,
        name: result.rows[0].title,
        products: [
          {
            name: result.rows[0].title,
            quantity: 1,
            price: fee,
          },
        ],
      },
    ],
    redirectUrls: {
      confirmUrl: `${env.SERVER_URL}/api/linepay/confirm`,
      cancelUrl: `${env.SERVER_URL}/api/linepay/callback`,
    },
  };

  const url = `${env.LINE_PAY_SITE}/${env.LINE_PAY_VERSION}/payments/request`;
  const header = createSignature('/payments/request', order);

  const linepayRes = await axios.post(url, order, { headers: header });
  if (linepayRes?.data.returnCode === '0000') {
    return linepayRes?.data.info.paymentUrl.web;
  }
  return null;
};

export const confirmLinepayOrder = async (req: Request, _res: Response) => {
  const { transactionId, orderId } = req.query;
  const query = `
    SELECT fee, member_id, activity_id
    FROM orders
    WHERE order_id = $1
  `;
  const values = [orderId];
  const result = await pool.query(query, values);

  const { member_id, activity_id, fee } = result.rows[0];

  const order = {
    amount: fee,
    currency: 'TWD',
  };
  const header = createSignature(`/payments/${transactionId}/confirm`, order);

  const url = `${env.LINE_PAY_SITE}/${env.LINE_PAY_VERSION}/payments/${transactionId}/confirm`;
  const linepayRes = await axios.post(url, order, { headers: header });

  if (linepayRes?.data.returnCode === '0000') {
    await pool.query('BEGIN');

    const capacity_query = `
      SELECT
        (SELECT capacity
          FROM activity
          WHERE activity_id = $1) - 
        (SELECT COUNT(*) AS number_of_participant
        FROM activity_role
        WHERE activity_id = $1) 
        AS RESULT;`;

    const query = `
      INSERT INTO MEMBER_JOIN_ACTIVITY (activity_id, member_id, join_timestamp)
      VALUES ($1, $2, CURRENT_TIMESTAMP);
      `;
    const values = [activity_id, member_id];
    try {
      const result = await pool.query(capacity_query, [activity_id]);
      const capacity_remain = result.rows[0].result;

      if (capacity_remain <= 0) {
        return null;
      }

      await pool.query(query, values);
      const query_role = `
      INSERT INTO activity_role(activity_id, member_id, activity_role)
      VALUES ($1, $2, 'Participant');
      `;
      const values_role = [activity_id, member_id];
      await pool.query(query_role, values_role);

      const query2 = `
      UPDATE member
      SET money = money + $1
      WHERE member_id = (
        SELECT ACTIVITY_ROLE.Member_id
        FROM ACTIVITY_ROLE
        WHERE ACTIVITY_ROLE.Activity_id = $2
          AND ACTIVITY_ROLE.Activity_role = 'Host'
      )
      `;
      const values2 = [fee, activity_id];
      await pool.query(query2, values2);

      await pool.query('COMMIT');
    } catch (error) {
      await pool.query('ROLLBACK');
      return null;
    }
  }

  return activity_id;
};
