import { Hono } from "hono";
import db from "../../services/db/index.ts";
import { getApiKeyEntryFromCtx } from "../../utils/helpers.ts";
import { HTTPException } from "hono/http-exception";

const prompts = new Hono();

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
