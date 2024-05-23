import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { pool } from '@/models/init';
import { nowDate } from '@/utils/nowDate';
import { createLinepayOrder } from '@/service/linepay.service';
import { upload } from '@/service/cloudinary.service';
import { env } from '@/utils/env';

// get 20 activities data
export const getActivityAll = async (req: Request, res: Response) => {
  const category = req.query.category;

  const timestamp = nowDate();

  if (category === 'all' || category === undefined) {
    const query = `
      SELECT *
      FROM activity
      where status = 'active'
      and event_end_timestamp > $1
      order by register_start_timestamp desc
      limit 20;
      `;
    const values = [timestamp];
    try {
      const result = await pool.query(query, values);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    const query = `
    SELECT *
    FROM activity
    where status = 'active'
    and event_end_timestamp > $1    
    and activity_tag = $2
    order by register_start_timestamp asc
    limit 20;
    `;
    const values = [timestamp, category];
    try {
      const result = await pool.query(query, values);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

export const createActivity = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;
  const {
    title,
    description,
    event_start_timestamp,
    event_end_timestamp,
    location,
    capacity,
    register_start_timestamp,
    register_end_timestamp,
    non_student_fee,
    student_fee,
    category,
    picture,
  } = req.body;

  const status = 'active';

  const activity_id = uuidv4();
  const chatgroup_id = uuidv4();

  const profilePublicId = uuidv4();
  const uploadResult = await upload(picture, `${profilePublicId}`, true, true);
  if (!uploadResult?.public_id) {
    throw new Error('File upload error.');
  }

  try {
    const query_activity = `
      INSERT INTO activity (activity_id,title, description, event_start_timestamp, event_end_timestamp, Location, capacity, status, register_start_timestamp, register_end_timestamp, non_student_fee, Student_fee, activity_tag, Img_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11, $12, $13, $14);
      `;
    const values_activity = [
      activity_id,
      title,
      description,
      event_start_timestamp,
      event_end_timestamp,
      location,
      capacity,
      status,
      register_start_timestamp,
      register_end_timestamp,
      non_student_fee,
      student_fee,
      category,
      uploadResult?.secure_url,
    ];
    await pool.query(query_activity, values_activity);

    const query_chatgroup = `
    INSERT INTO chat_group (chatgroup_id, activity_id, chat_name)
    VALUES ($1, $2, $3);
    `;
    const values_chatgroup = [chatgroup_id, activity_id, title];
    await pool.query(query_chatgroup, values_chatgroup);

    const query_activity_member = `
    INSERT INTO MEMBER_JOIN_ACTIVITY (activity_id, member_id, join_timestamp)
    VALUES ($1, $2, CURRENT_TIMESTAMP);
    `;
    const values_activity_member = [activity_id, member_id];
    await pool.query(query_activity_member, values_activity_member);

    const query_activity_role = `
    INSERT INTO activity_role (Member_id, activity_id, activity_role)
    VALUES ($1, $2, 'Host');
    `;
    const values_activity_role = [member_id, activity_id];
    await pool.query(query_activity_role, values_activity_role);

    res.status(201).json({ message: 'You have successfully created an activity!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const getActivityByTitle = async (req: Request, res: Response) => {
  const { title } = req.query;

  const query = `
    SELECT *
    FROM activity
    where title like $1
    and status = 'active';
    `;
  const values = ['%' + title + '%'];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  const { activity_id } = req.query;

  const query = `
    SELECT a.*, m.name, m.member_id
    FROM activity AS a
    JOIN activity_role AS ar ON a.activity_id = ar.activity_id
    JOIN member AS m ON ar.member_id = m.member_id
    where a.activity_id = $1 and ar.activity_role = 'Host';
    `;
  const values = [activity_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getActivityCapacity = async (req: Request, res: Response) => {
  const { activity_id } = req.query;

  const query = `
  select count(*) as number_of_participant
  from activity_role
  where activity_id = $1
    `;
  const values = [activity_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getActivityComments = async (req: Request, res: Response) => {
  const { activity_id } = req.query;

  const query = `
    SELECT *
    FROM activity_rating
    where activity_id = $1;
    `;
  const values = [activity_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getActivityRating = async (req: Request, res: Response) => {
  const { activity_id } = req.query;

  const query = `
    select avg(score) as average_score
    from activity_rating
    where activity_id = $1
    group by activity_id;
    `;
  const values = [activity_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const followActivity = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;
  const { activity_id } = req.body;

  // check if the user follows the activity
  const query_check = `
    select *
    from MEMBER_Follow_ACTIVITY
    where member_id = $1
    and activity_id = $2;
    `;
  const values_check = [member_id, activity_id];
  try {
    const result_check = await pool.query(query_check, values_check);
    if (result_check.rows.length !== 0) {
      const query_delete = `
      delete from MEMBER_Follow_ACTIVITY
      where member_id = $1
      and activity_id = $2;
      `;
      const values_delete = [member_id, activity_id];
      await pool.query(query_delete, values_delete);
      res.status(201).json("You've successfully unfollowed the activity!");
    } else {
      const query = `
      INSERT INTO MEMBER_Follow_ACTIVITY (activity_id, member_id)
      VALUES ($1, $2);
      `;
      const values = [activity_id, member_id];
      await pool.query(query, values);
      res.status(201).json("You've successfully followed the activity!");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export const quitActivity = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;
  const { activity_id } = req.query;
  const query = `
    insert into MEMBER_QUIT_ACTIVITY (activity_id, member_id, quit_timestamp)
    values ($1, $2, CURRENT_TIMESTAMP);
    `;
  const values = [activity_id, member_id];
  try {
    await pool.query(query, values);
    const query_role = `
    delete from activity_role
    where activity_id = $1 and member_id = $2;
    `;
    const values_role = [activity_id, member_id];
    await pool.query(query_role, values_role);
    res.status(201).json("You've successfully quit the activity!");
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getJoinedActivity = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;
  const query = `
    select *
    from activity as a
    inner join activity_role as ar on a.activity_id = ar.activity_id
    where ar.member_id = $1
    and status = 'active'
    and ar.activity_role = 'Participant';
    `;
  const values = [member_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getFollowedActivity = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;

  const query = `
    select *
    from activity as a
    inner join member_follow_activity as mfa on a.activity_id = mfa.activity_id
    where mfa.member_id = $1 and status = 'active';
    `;

  const values = [member_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getHostedActivity = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;
  const query = `
    select *
    from activity as a
    inner join activity_role as ar on a.activity_id = ar.activity_id
    where ar.member_id = $1
    and status = 'active'
    and ar.activity_role = 'Host';
    `;
  const values = [member_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const deleteActivity = async (req: Request, res: Response) => {
  const { activity_id } = req.query;

  const query = `
    update activity
    set status = 'cancel'
    where activity_id = $1;
    `;
  const values = [activity_id];
  try {
    await pool.query(query, values);
    res.status(201).json("You've successfully deleted the activity!");
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getChatgroup = async (req: Request, res: Response) => {
  const { activity_id } = req.params;
  const query = `
    select *
    from chat_group
    where activity_id = $1;
    `;
  const values = [activity_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getMessage = async (req: Request, res: Response) => {
  const { chatgroup_id } = req.params;
  const query = `
    select *
    from message as m
    where m.chatgroup_id = $1;
    `;
  const values = [chatgroup_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const insertMessage = async (req: Request, res: Response) => {
  const { chatgroup_id, member_id, message_text } = req.body;
  const message_id = uuidv4();
  const query = `
    insert into message (message_id, chatgroup_id, member_id, message_text, message_time)
    values ($1, $2, $3, $4, CURRENT_TIMESTAMP);
    `;
  const values = [message_id, chatgroup_id, member_id, message_text];
  try {
    await pool.query(query, values);
    res.status(201).json("You've successfully sent the message!");
  } catch (err) {
    res.status(400).json(err);
  }
};
export const rateActivity = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;
  const { activity_id, score, comment } = req.body;

  const query = `
    insert into activity_rating (member_id, activity_id, score, comment)
    values ($1, $2, $3, $4);
    `;
  const values = [member_id, activity_id, score, comment];
  try {
    await pool.query(query, values);
    res.status(201).json("You've successfully rated the activity!");
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getActivityMember = async (req: Request, res: Response) => {
  const { activity_id } = req.query;

  const query = `
    select m.name, m.member_id, ar.activity_role
    from activity_role as ar
    inner join member as m on ar.member_id = m.member_id
    where ar.activity_id = $1 and ar.activity_role = 'Participant';
    `;
  const values = [activity_id];
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const kickMember = async (req: Request, res: Response) => {
  const { activity_id, member_id } = req.query;
  const query = `
    delete from activity_role
    where activity_id = $1 and member_id = $2;
    `;
  const values = [activity_id, member_id];
  try {
    await pool.query(query, values);
    const query_quit = `
    insert into MEMBER_QUIT_ACTIVITY (activity_id, member_id, quit_timestamp)
    values ($1, $2, CURRENT_TIMESTAMP);
    `;
    const values_quit = [activity_id, member_id];
    await pool.query(query_quit, values_quit);
    res.status(201).json("You've successfully kicked the member!");
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllMember = async (req: Request, res: Response) => {
  const query = `
    select *
    from member;
    `;
  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const joinActivity = async (req: Request, res: Response) => {
  const { member_role, member_id } = req.user as any;
  const { activity_id } = req.body;

  const query = `
  SELECT student_fee, non_student_fee, title 
  FROM activity 
  WHERE activity_id = $1
`;
  const values = [activity_id];
  const result = await pool.query(query, values);

  const fee =
    member_role === 'Student' ? result.rows[0].student_fee : result.rows[0].non_student_fee;

  const joinavtivitysqlholder = async () => {
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

      await pool.query('COMMIT');
    } catch (error) {
      await pool.query('ROLLBACK');
      return null;
    }
  };

  if (fee > 0) {
    try {
      const url = await createLinepayOrder(req, res);
      res.status(200).send({
        data: {
          url,
        },
        message: '建單成功',
        status: 'success',
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else if (fee == 0) {
    try {
      const url = `${env.CLIENT_URL}/activity/main/${activity_id}`;
      joinavtivitysqlholder();
      res.status(200).send({
        data: {
          url,
        },
        message: '建單成功',
        status: 'success',
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
};
