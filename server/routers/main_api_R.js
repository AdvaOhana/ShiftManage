import express from 'express';
import users_R from "./users_R.js";
import shifts_R from "./shifts_R.js";
const router = express.Router();


router.use("/users", [], users_R);
router.use("/shifts", [], shifts_R);


export default router;