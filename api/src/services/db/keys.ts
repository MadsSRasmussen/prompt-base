import type { RowDataPacket } from "mysql2";
import { pool } from "../../configs/mysql.ts";
import encryption from "../../utils/encryption.ts";
import { ApiKey } from "#types";

async function getApiKey(key: string) {
  const hash = await encryption.hash(key);
  const [keys] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM ApiKey WHERE hash = ?",
    [hash],
  );
  return keys[0] ? keys[0] as ApiKey : null;
}

export default {
  getApiKey,
};
