import { Pool } from 'pg'; /* to interact with db */
import dotenv from 'dotenv'; /* to access .env variables */
import { type Request, type Response } from 'express'; /* https://expressjs.com/en/5x/api/request/ */

/* controller functions */

dotenv.config(); /* Loads .env file contents into process.env by default */
let message: string = 'Hello World';
console.log(message);

/* connect to both criminals and prisons table. NEED host to connect to database*/
const pool = new Pool({
  host: 'database',
  user: process.env.crimeUSER,
  password: process.env.crimePW,
  database: process.env.crimeDBname,
  port: 5432
});

export default pool;

/* https://medium.com/@oyerindesamuelabiodun/building-an-api-with-express-js-and-connecting-it-to-the-frontend-f0f0af656c71 
https://dev.to/justwonder/a-beginners-guide-to-building-a-crud-api-with-express-typescript-and-mongoose-2np0 */

/* create  customer */
export async function createCriminal(req: Request, res: Response) {
  const { prison_id, Name, Age, Gender, Crime, danger_lvl } = req.body;
  try {
    const query = await pool.query(`INSERT INTO criminals(prison_id, Name, Age, Gender, Crime, danger_lvl) VALUES ($1, $2, $3, $4, $5, $6)`, [prison_id, Name, Age, Gender, Crime, danger_lvl])
    console.log('criminal created!')
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create criminal" });
  }
}

/* read all customers and their information */
export async function getCriminals(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM criminals;");
    res.json(result.rows);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch criminals" });
  }
}

/* update customer information */
export async function updateCriminal(req: Request, res: Response) {
  const { id, prison_id, Name, Age, Gender, Crime, danger_lvl } = req.body;
  try {
    const query = await pool.query(`UPDATE criminals SET prison_id = ($1), Name = ($2), Age = ($3), Gender = ($4), Crime = ($5), danger_lvl = ($6) WHERE id = ($7)`, 
      [prison_id, Name, Age, Gender, Crime, danger_lvl, id])
    console.log('criminal updated!')
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update criminal" });
  }
}

/* delete customer */
export async function deleteCustomer(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const query = await pool.query(`DELETE FROM customers WHERE id = ($1)`, [id])
    console.log('customer deleted!')
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete customer" });
  }
}

/* 
pool: https://node-postgres.com/apis/pool
for the dotenv: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
for everything else: https://medium.com/@mateogalic112/how-to-build-a-node-js-api-with-postgresql-and-typescript-best-practices-and-tips-84fee3d1c46c
pool and client understanding: https://medium.com/@Shantanupokale/postgresql-pool-vs-client-1fd91ba605bf
*/
