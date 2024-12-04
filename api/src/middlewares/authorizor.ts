import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import db from "../services/db/index.ts";

const authorizor = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) throw new HTTPException(401);

  const apiKey = authHeader.split("Bearer sk-")[1];
  if (!apiKey) throw new HTTPException(401);

  const key = await db.keys.getApiKey(apiKey);
  if (!key) throw new HTTPException(401);

  await next();
});

export default authorizor;
