import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import GenObj_Mid from "./middleware/GenObj_Mid.js";
import main_api_R from "./routers/main_api_R.js";
import dotenv from "dotenv";
dotenv.config();
import db_M from './database.js';

global.db_pool = db_M.pool;


const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

global.GenObj_Mid = GenObj_Mid;

app.use('/api', main_api_R);

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});