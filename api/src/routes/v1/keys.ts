import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import encryption from "../../utils/encryption.ts";
import db from "../../services/db/index.ts";

const keys = new Hono();

keys.post("/", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) throw new HTTPException(401);

  const adminPassword = authHeader.split("Bearer ap-")[1];
  if (!adminPassword) throw new HTTPException(401);

  const correctPassword = Deno.env.get("EXPRESS_API_ADMIN_KEY");
  if (!correctPassword) throw new HTTPException(500);

  if (adminPassword !== correctPassword) throw new HTTPException(401);

  const body = await c.req.json();
  if (!(body["name"] || body["organisation"])) throw new HTTPException(400);

  const key = encryption.generateKey();
  const dbEntry = await db.keys.hashAndInsertApiKey(
    key,
    Number(body["organisation"]),
    body["name"] as string,
    key.split("sk-")[1].slice(0, 4),
  );

  return c.json({ secretKey: key, entry: dbEntry });
});

export default keys;
