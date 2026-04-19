import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT = process.env.DB_PORT;

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT,
    waitForConnections: true,
    connectionLimit: 25,
    maxIdle: 25,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

if (pool !== undefined) {
    console.log("my sql pool created");
}

export default {
    pool
};