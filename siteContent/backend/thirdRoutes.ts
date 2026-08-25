import express, { Router } from "express"; /* https://expressjs.com/en/5x/guide/routing/#approute */
import { createCriminal, deleteCriminal, getCriminals, searchCriminal, updateCriminal, createPrison, getPrisons, getPrison, getCriminalsByCountry } from "./thirdBackendScript.ts";
import cors from "cors";
const app = express();

/* initialise routes */

const router = Router();
app.use(cors()); // allow frontend to access backend despite port difference
app.use(express.json()); // parse requests into json

router.post("/criminals/:prison_id/:Name/:Age/:Gender/:Crime/:danger_lvl", createCriminal);
router.get("/criminals", getCriminals);
router.post("/criminals/:text", searchCriminal);
router.post("/criminals/:country", getCriminalsByCountry);
router.put("/criminals/:id/:prison_id/:Name/:Age/:Gender/:Crime/:danger_lvl", updateCriminal);
router.delete("/criminals/:id", deleteCriminal);

router.post("/prisons/:Name/:Country/:security_lvl/:max_prisoners/:prisoner_count/:Gender", createPrison);
router.get("/prisons", getPrisons);
router.post("/prisons/:Name", getPrison);

app.use('/', router);

app.listen(8888, () => {
    console.log(`Server running on http://localhost:8888`);
});