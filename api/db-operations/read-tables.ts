import type { RowDataPacket } from "mysql2/promise";
import { createDbConnection } from "../src/configs/mysql.ts";

const conn = await createDbConnection();

const [rows] = await conn.query<RowDataPacket[]>("SELECT * FROM Prompt");
console.log(rows);

conn.end();
Deno.exit();