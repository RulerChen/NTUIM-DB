import { Request, Response } from 'express';
import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { dbConfig } from '@/config/db.config';
export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    email,
    username,
    password,
    age,
    phone_number,
    isStudent,
    school_name,
    department,
    grade,
  } = req.body;
  const member_id = uuidv4();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    INSERT INTO member (member_id, email, name, password, age, phone, member_role)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
  const values = [
    member_id,
    email,
    username,
    hashedPassword,
    age,
    phone_number,
    isStudent ? 'Student' : 'Non-student',
  ];

  try {
    await client.query(query, values);
    if (isStudent) {
      const student_id = uuidv4();
      const query_student = `
      INSERT INTO student (member_id, student_id, school_name, department, grade)
      VALUES ($1, $2, $3, $4, $5);
      `;
      const values_student = [member_id, student_id, school_name, department, grade];
      await client.query(query_student, values_student);
    }
    res.status(201).json("You've successfully registered!");
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};

export const login = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
