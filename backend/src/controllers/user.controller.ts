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

export const login = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
