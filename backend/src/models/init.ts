import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

import { dbConfig } from '@/config/db.config';

export async function createTable() {
  const client = new Client(dbConfig);

  const sqlQuery = fs.readFileSync(path.join(__dirname, '/init.sql'), 'utf8');

  async function initSQL() {
    try {
      await client.connect();
      await client.query(sqlQuery);
      console.log('SQL init success');
    } catch (err) {
      console.error('SQL init error', err);
    } finally {
      client.end();
    }
  }

  initSQL();
}
