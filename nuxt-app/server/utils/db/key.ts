import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../configs/mysql";
import { ApiKey } from "~/types/db";

async function getById(kid: number): Promise<ApiKey | null> {
    const [keys] = await pool.query<RowDataPacket[]>(
        "SELECT id, name, peek, created_at, organisation_id FROM ApiKey WHERE id = ?",
        [kid],
    );

    return keys[0] ? keys[0] as ApiKey : null;
}

async function getByOrgId(oid: number): Promise<ApiKey[]> {
    const [keys] = await pool.query<RowDataPacket[]>(
        "SELECT id, name, peek, created_at, organisation_id FROM ApiKey WHERE organisation_id = ?",
        [oid]
    );

    return keys as ApiKey[]
}

async function removeById(kid: number): Promise<number> {
    const [delResult] = await pool.query<ResultSetHeader>(
        "DELETE FROM ApiKey WHERE id = ?",
        [kid]
    );
    return delResult.affectedRows;
}

export default {
    getById,
    getByOrgId,
    removeById,
}