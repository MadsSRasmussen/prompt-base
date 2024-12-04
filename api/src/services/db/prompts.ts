import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../configs/mysql.ts";
import type { Prompt } from "#types";

async function getPromptById(promptId: number): Promise<Prompt | null> {
  const [prompts] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM Prompt WHERE id = ?",
    [promptId],
  );
  return prompts[0] ? prompts[0] as Prompt : null;
}

async function getPromptsOfCollection(collId: number): Promise<Prompt[]> {
  const [prompts] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM Prompt WHERE collection_id = ?",
    [collId],
  );
  return prompts as Prompt[];
}

export default {
  getById: getPromptById,
  getByCollection: getPromptsOfCollection,
};
