import express from 'express';
import users_R from "./users_R.js";
const router = express.Router();


router.use("/users", [], users_R);

export default router;