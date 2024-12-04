import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../configs/mysql.ts";
import type { Collection } from "#types";

async function getCollectionById(collId: number): Promise<Collection | null> {
  const [colls] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM Collection WHERE id = ?",
    [collId],
  );
  return colls[0] ? colls[0] as Collection : null;
}

async function getCollectionByNameAndOrgId(orgId: number, name: string) {
  const [colls] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM Collection WHERE organisation_id = ? AND name = ?",
    [orgId, name],
  );
  return colls[0] ? colls[0] as Collection : null;
}

async function getCollectionsOrgId(orgId: number) {
  const [colls] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM Collection WHERE organisation_id = ?",
    [orgId],
  );
  return colls as Collection[];
}

export default {
  getById: getCollectionById,
  getByOrgId: getCollectionsOrgId,
  getByName: getCollectionByNameAndOrgId,
};
