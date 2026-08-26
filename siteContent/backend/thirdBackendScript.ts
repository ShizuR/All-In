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

/* Criminals */
/* create  criminal */
export async function createCriminal(req: Request, res: Response) {
  const { prison_id, Name, Age, Gender, Crime, danger_lvl } = req.body;
  try {
    const query = await pool.query(`INSERT INTO criminals(prison_id, Name, Age, Gender, Crime, danger_lvl) VALUES ($1, $2, $3, $4, $5, $6)`, [prison_id, Name, Age, Gender, Crime, danger_lvl])
    const update = await pool.query(`UPDATE prisons SET prisoner_count = prisoner_count + 1 WHERE prison_id = ($1)`, 
      [prison_id])
    console.log('criminal created!')
    res.json('Criminal created!')
  }
  catch (err) {
    console.error(err);
    // the only possible error that can be gotten
    res.json('Criminal name already exists, ensure name is unique to the database');
  }
}

/* read all criminals and their information */
export async function getCriminals(req: Request, res: Response) {
  try {
    const result = await pool.query(`SELECT criminals.id AS id, criminals.Name AS Name, criminals.Age AS Age, criminals.Gender AS Gender, Crime, danger_lvl, prisons.Name AS Prison 
      FROM criminals 
      INNER JOIN prisons
      ON criminals.prison_id = prisons.prison_id;`);
    res.json(result.rows);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch criminals" });
  }
}

export async function getCriminalsByCountry(req: Request, res: Response) {
  try {
    const { country } = req.body;
    const result = await pool.query(`SELECT criminals.Name AS Name, criminals.Age AS Age, criminals.Gender AS Gender, Crime, danger_lvl, prisons.Name AS Prison 
      FROM criminals 
      INNER JOIN prisons
      ON criminals.prison_id = prisons.prison_id AND prisons.Country = ($1);`, [country]);
    res.json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch criminals from country" });
  }
}

/* update criminal information */
export async function updateCriminal(req: Request, res: Response) {
  const { id, prison_id, Name, Age, Gender, Crime, danger_lvl } = req.body;
  try {
    const check = await pool.query(`SELECT * FROM criminals WHERE id = ($1);`, [id])
    const query = await pool.query(`UPDATE criminals SET prison_id = ($1), Name = ($2), Age = ($3), Gender = ($4), Crime = ($5), danger_lvl = ($6) WHERE id = ($7);`, 
      [prison_id, Name, Age, Gender, Crime, danger_lvl, id])
    if (check.rows[0].prison_id != prison_id) { // if the prison changed
      // update new prison
      const update = await pool.query(`UPDATE prisons SET prisoner_count = prisoner_count + 1 WHERE prison_id = ($1);`, 
        [prison_id])
      // update old prison
      const subtract = await pool.query(`UPDATE prisons SET prisoner_count = prisoner_count - 1 WHERE prison_id = ($1);`, 
        [check.rows[0].prison_id])
    }
    console.log('criminal updated!')
    res.json('Criminal updated!')
  }
  catch (err) {
    console.error(err);
    res.json('Criminal cannot be updated. Ensure name is unique to the database')
  }
}

/* delete criminal */
export async function deleteCriminal(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const check = await pool.query(`SELECT * FROM criminals WHERE id = ($1);`, [id])
    const query = await pool.query(`DELETE FROM criminals WHERE id = ($1)`, [id])
    const update = await pool.query(`UPDATE prisons SET prisoner_count = prisoner_count -1 WHERE prison_id = ($1)`, 
      [check.rows[0].prison_id])
    console.log('criminal deleted!')
    res.json('Criminal deleted!')
  }
  catch (err) {
    console.error(err);
    res.json("Failed to delete criminal");
  }
}

export async function searchCriminal(req: Request, res: Response) {
  console.log('called')
  try {
    let { text } = req.body;
    // replace all spaces with a wildcard
    // /g = global white spaces, not just first instance
    let newText = text.replace(/ /g, '%');
    text = '%' + newText + '%';
    console.log('searched name: ', text)
    const result = await pool.query(`SELECT criminals.Name AS Name, criminals.Age AS Age, criminals.Gender AS Gender, Crime, danger_lvl, prisons.Name AS Prison 
      FROM criminals 
      INNER JOIN prisons
      ON criminals.prison_id = prisons.prison_id
      WHERE criminals.Name ILIKE ($1)`, [text])
    res.json(result.rows);
  }
  catch (err) {
    res.json('Failed search')
  }
}

/* Prisons */
/* create prison */
export async function createPrison(req: Request, res: Response) {
  const { Name, Country, security_lvl, max_prisoners, prisoner_count, Gender } = req.body;
  try {
    const query = await pool.query(`INSERT INTO prisons(Name, Country, security_lvl, max_prisoners, prisoner_count, Gender) VALUES ($1, $2, $3, $4, $5, $6)`, 
      [Name, Country, security_lvl, max_prisoners, prisoner_count, Gender])
    console.log('prison created!')
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create prison" });
  }
}

/* read all prisons and their information */
export async function getPrisons(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM prisons;");
    res.json(result.rows);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch prisons" });
  }
}

export async function getPrison(req: Request, res: Response) {
  try {
    const {name} = req.body
    const result = await pool.query("SELECT * FROM prisons WHERE prisons.Name = ($1);", [name]);
    res.json(result.rows);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch prison" });
  }
}

/* 
pool: https://node-postgres.com/apis/pool
for the dotenv: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
for everything else: https://medium.com/@mateogalic112/how-to-build-a-node-js-api-with-postgresql-and-typescript-best-practices-and-tips-84fee3d1c46c
pool and client understanding: https://medium.com/@Shantanupokale/postgresql-pool-vs-client-1fd91ba605bf
*/
