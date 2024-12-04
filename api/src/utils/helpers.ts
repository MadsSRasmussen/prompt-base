import { HTTPException } from "hono/http-exception";
import { Context } from "hono";
import db from "../services/db/index.ts";

export function getSecretKeyFromCtx(ctx: Context) {
  const authHeader = ctx.req.header("Authorization");
  if (!authHeader) throw new HTTPException(401);

  const apiKey = authHeader.split("Bearer ")[1];
  if (!apiKey) throw new HTTPException(401);

  return apiKey;
}

export async function getApiKeyEntryFromCtx(ctx: Context) {
  const apiKey = await db.keys.getApiKeyFromCtx(ctx);
  if (!apiKey) throw new HTTPException(401);
  return apiKey;
}
