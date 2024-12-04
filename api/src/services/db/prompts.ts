import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../configs/mysql.ts";
import type { Prompt } from "#types";

async function getPromptById(
  promptId: number,
): Promise<Prompt & { organisation_id: number } | null> {
  const [prompts] = await pool.query<RowDataPacket[]>(
    "SELECT Prompt.id, Prompt.name, Prompt.content, Prompt.collection_id, Collection.organisation_id " +
      "FROM Prompt " +
      "INNER JOIN Collection ON Collection.id = Prompt.collection_id " +
      "WHERE Prompt.id = ?",
    [promptId],
  );
  return prompts[0] ? prompts[0] as Prompt & { organisation_id: number } : null;
}

async function getPromptsOfCollection(collId: number): Promise<Prompt[]> {
  const [prompts] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM Prompt WHERE collection_id = ? ",
    [collId],
  );
  return prompts as Prompt[];
}

export default {
  getById: getPromptById,
  getByCollection: getPromptsOfCollection,
};
