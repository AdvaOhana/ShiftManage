import express from 'express';
import users_R from "./users_R.js";
import shifts_R from "./shifts_R.js";
import unavailability_R from "./unavailability_R.js";
import assignments_R from "./assignments_R.js";
const router = express.Router();


router.use("/users", [], users_R);
router.use("/shifts", [], shifts_R);
router.use("/unavailability", [], unavailability_R);
router.use("/assignments", [], assignments_R);


export default router;