import { Pool } from 'pg'; /* to interact with db */
import dotenv from 'dotenv'; /* to access .env variables */
import { type Request, type Response } from 'express'; /* https://expressjs.com/en/5x/api/request/ */

/* controller functions */

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

/* https://medium.com/@oyerindesamuelabiodun/building-an-api-with-express-js-and-connecting-it-to-the-frontend-f0f0af656c71 
https://dev.to/justwonder/a-beginners-guide-to-building-a-crud-api-with-express-typescript-and-mongoose-2np0 */

/* create  customer */
export async function createCustomer(req: Request, res: Response) {
  const { name, email } = req.body;
  try {
    const query = await pool.query(`INSERT INTO customers(name, email) VALUES ($1, $2)`, [name, email])
    console.log('customer created!')
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create customer" });
  }
}

/* read all customers and their information */
export async function getCustomers(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM customers;");
    res.json(result.rows);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
}

/* update customer information */
export async function updateCustomer(req: Request, res: Response) {
  const { name, email, id } = req.body;
  try {
    const query = await pool.query(`UPDATE customers SET name = ($1), email = ($2) WHERE id = ($3)`, [name, email, id])
    console.log('customer updated!')
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update customer" });
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
