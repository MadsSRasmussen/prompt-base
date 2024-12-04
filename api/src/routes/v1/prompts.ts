import { Hono } from "hono";
import db from "../../services/db/index.ts";
import { getApiKeyEntryFromCtx } from "../../utils/helpers.ts";
import { HTTPException } from "hono/http-exception";

const prompts = new Hono();

prompts.get("/", async (c) => {
  const apiKey = await getApiKeyEntryFromCtx(c);

  const colQuery = c.req.queries("col");
  const nameQuery = c.req.queries("name");

  if (nameQuery) {
    if (colQuery) {
      const coll = await db.collections.getById(Number(colQuery[0]));
      if (!coll) throw new HTTPException(404);
      if (coll.organisation_id !== apiKey.organisation_id) {
        throw new HTTPException(401);
      }

      const prompts = db.prompts.getByNameInCollection(coll.id, nameQuery[0]);
      return c.json(prompts);
    } else {
      const prompts = await db.prompts.getByName(
        apiKey.organisation_id,
        nameQuery[0],
      );
      return c.json(prompts);
    }
  } else if (colQuery) {
    const coll = await db.collections.getById(Number(colQuery[0]));
    if (!coll) throw new HTTPException(404);
    if (coll.organisation_id !== apiKey.organisation_id) {
      throw new HTTPException(401);
    }

    const prompts = await db.prompts.getByCollection(coll.id);
    return c.json(prompts);
  } else {
    const prompts = await db.prompts.getByOrganisation(apiKey.organisation_id);
    return c.json(prompts);
  }
});

prompts.get("/:id", async (c) => {
  const apiKey = await getApiKeyEntryFromCtx(c);

  const promptId = c.req.param("id");
  const prompt = await db.prompts.getById(Number(promptId));

  if (!prompt) throw new HTTPException(404);
  if (apiKey.organisation_id !== prompt.organisation_id) {
    throw new HTTPException(401);
  }
  return c.json(prompt);
});

export default prompts;
