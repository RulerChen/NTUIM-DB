import { Request, Response } from 'express';
import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

import { dbConfig } from '../config/db.config';

export const createActivity = async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    member_id,
    description,
    event_start_timestamp,
    event_end_timestamp,
    Location,
    capacity,
    status,
    register_start_timestamp,
    register_end_timestamp,
    non_student_fee,
    Student_fee,
    requirement,
    chatname,
    activity_tags,
  } = req.body;

  const activity_id = uuidv4();
  const chatgroup_id = uuidv4();

  const client = new Client(dbConfig);
  await client.connect();
  const query_activity = `
    INSERT INTO activity (activity_id, Description, Event_start_timestamp, Event_end_timestamp, Location, Capacity, Status, Register_start_timestamp, Register_end_timestamp, Non_student_fee, Student_fee)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;
  const values_activity = [
    activity_id,
    description,
    event_start_timestamp,
    event_end_timestamp,
    Location,
    capacity,
    status,
    register_start_timestamp,
    register_end_timestamp,
    non_student_fee,
    Student_fee,
  ];
  try {
    await client.query(query_activity, values_activity);

    const query_chatgroup = `
    INSERT INTO chatgroup (chatgroup_id, activity_id, chatname)
    VALUES ($1, $2, $3);
    `;
    const values_chatgroup = [chatgroup_id, activity_id, chatname];
    await client.query(query_chatgroup, values_chatgroup);

    const query_activity_member = `
    INSERT INTO MEMBER_JOIN_ACTIVITY (activity_id, member_id, join_timestamp)
    VALUES ($1, $2, CURRENT_TIMESTAMP);
    `;
    const values_activity_member = [activity_id, member_id];
    await client.query(query_activity_member, values_activity_member);

    const query_activity_requirement = `
    INSERT INTO activity_requirement (activity_id, requirement)
    VALUES ($1, $2);
    `;
    const values_activity_requirement = [activity_id, requirement];
    await client.query(query_activity_requirement, values_activity_requirement);

    activity_tags.forEach(async (activity_tag: string) => {
      const query_activity_tag = `  
    INSERT INTO ACTIVITY_TOPIC_TAG (activity_id, Activity_tag)
    VALUES ($1, $2);
    `;
      const values_activity_tag = [activity_id, activity_tag];
      await client.query(query_activity_tag, values_activity_tag);
    });

    const query_activity_role = `
    INSERT INTO activity_role (Member_id, activity_id, activity_role)
    VALUES ($1, $2, 'Host');
    `;
    const values_activity_role = [member_id, activity_id];
    await client.query(query_activity_role, values_activity_role);

    res.status(201).json({ activity_id: activity_id, chatgroup_id: chatgroup_id });
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};

export const getActivityByDescription = async (req: Request, res: Response) => {
  // only input description
  console.log(req.body);
  const { description } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    SELECT *
    FROM activity
    where Description like $1
    and status = 'active';
    `;
  const values = ['%' + description + '%'];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getActivityByTime = async (req: Request, res: Response) => {
  // only input tag and time
  console.log(req.body);
  const { event_start_timestamp, event_end_timestamp } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    SELECT *
    FROM activity
    and event_start_timestamp > $1
    and event_end_timestamp < $2
    and status = 'active';
    `;
  const values = [event_start_timestamp, event_end_timestamp];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getActivityByTag = async (req: Request, res: Response) => {
  console.log(req.body);
  const { activity_tag } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select *
    from activity as a
    join activity_topic_tag as at on at.activity_id = a.activity_id
    where at.activity_tag = $1
    and a.status = 'active';
    `;
  const values = [activity_tag];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getJoinedActivityByTag = async (req: Request, res: Response) => {
  console.log(req.body);
  const { member_id, activity_tag } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select *
    from activity as a
    inner join activity_role as ar on a.activity_id = ar.activity_id
    inner join activity_topic_tag as at on at.activity_id = a.activity_id
    where at.activity_tag = $2
    and ar.member_id = $1
    `;
  const values = [member_id, activity_tag];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const followActivity = async (req: Request, res: Response) => {
  // only input location
  console.log(req.body);
  const { member_id, activity_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    INSERT INTO MEMBER_Follow_ACTIVITY (activity_id, member_id)
    VALUES ($1, $2);
    `;
  const values = [activity_id, member_id];
  await client.query(query, values);
  try {
    res.status(201).json("You've successfully followed the activity!");
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const joinActivity = async (req: Request, res: Response) => {
  console.log(req.body);
  const { member_id, activity_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    INSERT INTO MEMBER_JOIN_ACTIVITY (activity_id, member_id, join_timestamp)
    VALUES ($1, $2, CURRENT_TIMESTAMP);
    INSERT INTO activity_role(activity_id, member_id, activity_role)
    VALUES ($1, $2, 'Participant');
    `;
  const values = [activity_id, member_id];
  await client.query(query, values);
  try {
    res.status(201).json("You've successfully joined the activity!");
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const quitActivity = async (req: Request, res: Response) => {
  console.log(req.body);
  const { member_id, activity_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    insert into MEMBER_QUIT_ACTIVITY (activity_id, member_id, quit_timestamp)
    values ($1, $2, CURRENT_TIMESTAMP);
    delete from activity_role
    where activity_id = $1 and member_id = $2;
    `;
  const values = [activity_id, member_id];
  await client.query(query, values);
  try {
    res.status(201).json("You've successfully quit the activity!");
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getJoinedActivity = async (req: Request, res: Response) => {
  console.log(req.body);
  const { member_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
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
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getFollowedActivity = async (req: Request, res: Response) => {
  console.log(req.body);
  const { member_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select *
    from activity as a
    inner join MEMBER_Follow_ACTIVITY as mfa on a.activity_id = mfa.activity_id
    where mfa.member_id = $1
    and a.status = 'active';
    `;
  const values = [member_id];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getHostedActivity = async (req: Request, res: Response) => {
  console.log(req.body);
  const { member_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
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
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getChatgroup = async (req: Request, res: Response) => {
  console.log(req.body);
  const { activity_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select *
    from chatgroup
    where activity_id = $1;
    `;
  const values = [activity_id];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getMessage = async (req: Request, res: Response) => {
  console.log(req.body);
  const { chatgroup_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select *
    message as m
    where m.chatgroup_id = $1;
    `;
  const values = [chatgroup_id];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const insertMessage = async (req: Request, res: Response) => {
  console.log(req.body);
  const { chatgroup_id, member_id, message_text } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const message_id = uuidv4();
  const query = `
    insert into message (message_id, chatgroup_id, member_id, message_text, message_time)
    values ($1, $2, $3, $4, CURRENT_TIMESTAMP);
    `;
  const values = [message_id, chatgroup_id, member_id, message_text];
  try {
    await client.query(query, values);
    res.status(201).json("You've successfully sent the message!");
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const rateActivity = async (req: Request, res: Response) => {
  console.log(req.body);
  const { activity_id, member_id, score, comment } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    insert into activity_rating (member_id, activity_id, score, comment)
    values ($1, $2, $3, $4);
    `;
  const values = [member_id, activity_id, score, comment];
  try {
    await client.query(query, values);
    res.status(201).json("You've successfully rated the activity!");
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getActivityRating = async (req: Request, res: Response) => {
  console.log(req.body);
  const { activity_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select avg(score) as average_score
    from activity_rating
    where activity_id = $1
    group by activity_id;
    `;
  const values = [activity_id];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getActivityNumber = async (req: Request, res: Response) => {
  console.log(req.body);
  const { activity_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select count(*) as number_of_participant
    from activity_role
    where activity_id = $1
    `;
  const values = [activity_id];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getActivityMember = async (req: Request, res: Response) => {
  console.log(req.body);
  const { activity_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select m.name, m.member_id, ar.activity_role
    from activity_role as ar
    inner join member as m on ar.member_id = m.member_id
    where ar.activity_id = $1
    `;
  const values = [activity_id];
  try {
    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const kickMember = async (req: Request, res: Response) => {
  console.log(req.body);
  const { activity_id, member_id } = req.body;
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    delete from activity_role
    where activity_id = $1 and member_id = $2;
    insert into MEMBER_QUIT_ACTIVITY (activity_id, member_id, quit_timestamp)
    values ($1, $2, CURRENT_TIMESTAMP);
    `;
  const values = [activity_id, member_id];
  try {
    await client.query(query, values);
    res.status(201).json("You've successfully kicked the member!");
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const findActivityNeedAttention = async (req: Request, res: Response) => {
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
      select *
      from activity as a
      join activity_role as ar on a.activity_id = ar.activity_id
      group by a.activity_id
      having DATEDIFF(day, GETDATE(), a.register_end_timestamp) <= 7
      and count(*) < a.capacity / 4;
    `;
  try {
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getAllActivity = async (req: Request, res: Response) => {
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
      select *
      from activity
      where status = 'active';
    `;
  try {
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};
export const getAllMember = async (req: Request, res: Response) => {
  const client = new Client(dbConfig);
  await client.connect();
  const query = `
    select *
    from member;
    `;
  try {
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.end();
  }
};

// done first part
