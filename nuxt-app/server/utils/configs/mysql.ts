import mysql, { ConnectionOptions } from "mysql2/promise";

const mysqlConfig = useRuntimeConfig().db;

const pool = mysql.createPool(mysqlConfig);

export { pool };