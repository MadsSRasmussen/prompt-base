import { Hono } from "hono";
import db from "../../services/db/index.ts";

const prompts = new Hono();

prompts.get("/:id", async (c) => {
  const promptId = c.req.param("id");
  const prompt = await db.prompts.getById(Number(promptId));
  return c.json(prompt);
});

prompts.put("/:id", (c) => {
  return c.json("PUT /prompts");
});

export default prompts;
