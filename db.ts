import mysql from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});