import { NextFunction, Request, Response } from 'express';
import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import passport from 'passport';

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

export const updateUser = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;
  const { email, name, age, phone, member_role, school_name, department, grade } = req.body;
  console.log(req.body);
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    UPDATE member
    SET email = $1, name = $2, age = $3, phone = $4, member_role = $5
    WHERE member_id = $6;
    `;
  const values = [email, name, age, phone, member_role, member_id];

  try {
    await client.query(query, values);
    if (member_role === 'Student') {
      const query_student = `
      UPDATE student
      SET school_name = $1, department = $2, grade = $3
      WHERE member_id = $4;
      `;
      const values_student = [school_name, department, grade, member_id];
      await client.query(query_student, values_student);
    }
    res.status(200).json("You've successfully updated your profile!");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  } finally {
    client.end();
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { member_id, password } = req.user as any;
  const { new_password, old_password } = req.body;
  if (!bcrypt.compareSync(old_password, password)) {
    res.status(400).json('Your old password is wrong!');
    return;
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(new_password, saltRounds);

  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    UPDATE member
    SET password = $1
    WHERE member_id = $2;
    `;
  const values = [hashedPassword, member_id];

  try {
    await client.query(query, values);
    res.status(200).json("You've successfully updated your password!");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  } finally {
    client.end();
  }
};

export const getStudentInfo = async (req: Request, res: Response) => {
  const { member_id } = req.user as any;
  console.log(member_id);
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
  select * from student 
  where member_id = $1;
  `;
  const values = [member_id];

  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};

export const login = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (!user || err) {
      return res.status(400).json({ message: info.messages });
    }
    req.logIn(user, (err) => {
      if (err) {
        throw err;
      }
      return res.status(200).json(user);
    });
  })(req, res);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'You have successfully logged out' });
  });
};

export const isLogin = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
