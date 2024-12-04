import type { RowDataPacket } from "mysql2";
import { pool } from "../../configs/mysql.ts";
import encryption from "../../utils/encryption.ts";
import { ApiKey } from "#types";
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

export default {
  getApiKey,
  getApiKeyFromCtx,
};
