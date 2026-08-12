import express, { Router } from "express"; /* https://expressjs.com/en/5x/guide/routing/#approute */
import { createCustomer, getCustomers, updateCustomer } from "./thirdBackendScript.ts";
import cors from "cors";
const app = express();

/* initialise routes */

const router = Router();
app.use(cors()); // allow frontend to access backend
app.use(express.json()); // parse requests into json

router.post("/customers/:name/:email", createCustomer);
router.get("/customers", getCustomers);
router.put("/customers/:name/:email/:id", updateCustomer);

/*
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
*/

app.use('/', router);

app.listen(8888, () => {
    console.log(`Server running on http://localhost:8888`);
});