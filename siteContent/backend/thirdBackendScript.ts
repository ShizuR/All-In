import { Pool } from 'pg'; /* to interact with db */
import dotenv from 'dotenv'; /* to access .env variables */
import type { Request, Response } from 'express';

dotenv.config(); /* Loads .env file contents into process.env by default */
let message: string = 'Hello World';
console.log(message);

/* connect to customer table. NEED host to connect to database*/
const pool = new Pool({
  host: 'database',
  user: process.env.custUSER,
  password: process.env.custPW,
  database: process.env.custDBname,
  port: 5432
});

export default pool;

/* get all customers and their information 
export async function getCustomers(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM customers;");
    return res.json(result.rows);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
} */

const result = await pool.query('SELECT * from customers')
console.log(result.rows) // brianc
/* 
pool: https://node-postgres.com/apis/pool
for the dotenv: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
for everything else: https://medium.com/@mateogalic112/how-to-build-a-node-js-api-with-postgresql-and-typescript-best-practices-and-tips-84fee3d1c46c
pool and client understanding: https://medium.com/@Shantanupokale/postgresql-pool-vs-client-1fd91ba605bf
*/
