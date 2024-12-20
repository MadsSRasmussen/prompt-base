import { ResultSetHeader, type RowDataPacket } from "mysql2";
import { pool } from "../../configs/mysql.ts";
import encryption from "../../utils/encryption.ts";
import { ApiKey } from "../../../types/index.ts";
import { Context } from "hono";
import { getSecretKeyFromCtx } from "../../utils/helpers.ts";

async function getApiKey(key: string) {
  const hash = await encryption.hash(key);
  const [keys] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM ApiKey WHERE hash = ?",
    [hash],
  );
  return keys[0] ? keys[0] as ApiKey : null;
}

async function getApiKeyFromCtx(ctx: Context) {
  return await getApiKey(getSecretKeyFromCtx(ctx));
}

async function hashAndInsertApiKey(
  key: string,
  oid: number,
  name: string,
  peek: string,
): Promise<ApiKey> {
  const hash = await encryption.hash(key);
  const [insResult] = await pool.query<ResultSetHeader>(
    "INSERT INTO ApiKey (hash, organisation_id, name, peek) VALUES (?, ?, ?, ?)",
    [hash, oid, name, peek],
  );

  const [keys] = await pool.query<RowDataPacket[]>(
    "SELECT id, name, peek, created_at, organisation_id FROM ApiKey WHERE id = ?",
    [insResult.insertId],
  );

  return keys[0] as ApiKey;
}

export default {
  getApiKey,
  getApiKeyFromCtx,
  hashAndInsertApiKey,
};
