import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'test',
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
});
