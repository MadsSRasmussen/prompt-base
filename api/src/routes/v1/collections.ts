import { Hono } from "hono";
import db from "../../services/db/index.ts";
import { getApiKeyEntryFromCtx } from "../../utils/helpers.ts";
import { HTTPException } from "hono/http-exception";

const collections = new Hono();

collections.get("/", async (c) => {
  const apiKey = await getApiKeyEntryFromCtx(c);

  const colls = await db.collections.getByOrgId(apiKey.organisation_id);

  return c.json(colls);
});

collections.get("/:id", async (c) => {
  const apiKey = await getApiKeyEntryFromCtx(c);

  const collId = c.req.param("id");
  const coll = await db.collections.getById(Number(collId));

  if (!coll) throw new HTTPException(404);

  if (coll && (coll.organisation_id !== apiKey.organisation_id)) {
    throw new HTTPException(401);
  }

  return c.json(coll);
});

collections.get("/:id/prompts", async (c) => {
  const apiKey = await getApiKeyEntryFromCtx(c);

  const collId = c.req.param("id");
  const prompts = await db.prompts.getByCollection(Number(collId));

  const orgSet = new Set<number>();
  prompts.forEach((prompt) => orgSet.add(prompt.collection_id));
  if (orgSet.size !== 1) throw new HTTPException(500);

  if (!orgSet.has(apiKey.organisation_id)) throw new HTTPException(401);

  return c.json(prompts);
});

export default collections;
