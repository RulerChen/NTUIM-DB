import { Request, Response } from 'express';
import { Client } from 'pg';

import { dbConfig } from '@/config/db.config';

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, username, password } = req.body;
  const client = new Client(dbConfig);
  client.connect();
  const query = `
        INSERT INTO users (email, username, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
  const values = [email, username, password];
  try {
    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const client = new Client(dbConfig);
//   client.connect();
//   const query = `
//         SELECT * FROM users
//         WHERE email = $1 AND password = $2;
//     `;
//   const values = [email, password];
//   try {
//     const result = await client.query(query, values);
//     if (result.rows.length === 0) {
//       res.status(404).json({ message: 'User not found' });
//     } else {
//       res.status(200).json(result.rows[0]);
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   } finally {
//     client.end();
//   }
// };

export const login = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
