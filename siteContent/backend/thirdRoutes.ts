import express, { Router } from "express"; /* https://expressjs.com/en/5x/guide/routing/#approute */
import { createCriminal, deleteCriminal, getCriminals, updateCriminal } from "./thirdBackendScript.ts";
import cors from "cors";
const app = express();

/* initialise routes */

const router = Router();
app.use(cors()); // allow frontend to access backend
app.use(express.json()); // parse requests into json

router.post("/criminals/:prison_id/:Name/:Age/:Gender/:Crime/:danger_lvl", createCriminal);
router.get("/criminals", getCriminals);
router.put("/criminals/:id/:prison_id/:Name/:Age/:Gender/:Crime/:danger_lvl", updateCriminal);
router.delete("/criminals/:id", deleteCriminal);

app.use('/', router);

app.listen(8888, () => {
    console.log(`Server running on http://localhost:8888`);
});