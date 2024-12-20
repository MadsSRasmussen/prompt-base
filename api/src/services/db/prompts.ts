import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../configs/mysql.ts";
import type { Prompt } from "../../../types/index.ts";

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

async function getPromptByName(
  orgId: number,
  name: string,
): Promise<Prompt[]> {
  const [prompts] = await pool.query<RowDataPacket[]>(
    "SELECT Prompt.id, Prompt.name, Prompt.content, Prompt.collection_id " +
      "FROM Collection " +
      "INNER JOIN Prompt ON Collection.id = Prompt.collection_id " +
      "WHERE Collection.organisation_id = ? AND Prompt.name = ?",
    [orgId, name],
  );
  return prompts as Prompt[];
}

async function getPromptsOfCollection(collId: number): Promise<Prompt[]> {
  const [prompts] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM Prompt WHERE collection_id = ? ",
    [collId],
  );
  return prompts as Prompt[];
}

async function getByNameInCollection(
  collId: number,
  name: string,
): Promise<Prompt[]> {
  const [prompts] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM Prompt WHERE collection_id = ? AND name = ?",
    [collId, name],
  );
  return prompts as Prompt[];
}

async function getByOrganisation(
  orgId: number,
  limit: number = 100,
): Promise<Prompt[]> {
  const [prompts] = await pool.query<RowDataPacket[]>(
    "SELECT Prompt.id, Prompt.name, Prompt.content, Prompt.collection_id " +
      "FROM Collection " +
      "INNER JOIN Prompt ON Collection.id = Prompt.collection_id " +
      "WHERE Collection.organisation_id = ? " +
      "LIMIT ?",
    [orgId, limit],
  );
  return prompts as Prompt[];
}

export default {
  getById: getPromptById,
  getByName: getPromptByName,
  getByCollection: getPromptsOfCollection,
  getByNameInCollection: getByNameInCollection,
  getByOrganisation: getByOrganisation,
};
