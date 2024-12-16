import mysql, { ConnectionOptions } from "mysql2/promise";

const mysqlConfig = useRuntimeConfig().mysql;

const pool = mysql.createPool(mysqlConfig);

export { pool };