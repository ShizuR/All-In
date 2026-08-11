import express, { Router } from "express"; /* https://expressjs.com/en/5x/guide/routing/#approute */
import { createCustomer, getCustomers } from "./thirdBackendScript.ts";
const app = express();

/* initialise routes */

const router = Router();

router.post("/:name/:email", createCustomer);
router.get("/customers", getCustomers);

/*
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
*/

app.use('/', router);

app.listen(8888, () => {
    console.log(`Server running on http://localhost:8888`);
});