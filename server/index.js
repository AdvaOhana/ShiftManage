import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import GenObj_Mid from "./middleware/GenObj_Mid.js";
import main_api_R from "./routers/main_api_R.js";

import db_M from './database.js';

global.db_pool = db_M.pool;


const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
}));


global.GenObj_Mid = GenObj_Mid;

app.use('/api', main_api_R);

app.use((req, res) => {
    res.status(404).json({ error: 'Page Not Found', status: "404" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});