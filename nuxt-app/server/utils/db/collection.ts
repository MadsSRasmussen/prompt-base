import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../configs/mysql";
import { Collection } from "~/types/db";

async function getById(cid: number): Promise<Collection | null> {
    const [colls] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Collection WHERE id = ?",
        [cid]
    );
    return colls[0] ? colls[0] as Collection : null
}

async function getByOrgId(oid: number): Promise<Collection[]> {
    const [colls] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Collection WHERE organisation_id = ?",
        [oid]
    );

    return colls as Collection[];
}

async function create(name: string, orgId: number) {
    const [insResult] = await pool.query<ResultSetHeader>(
        "INSERT INTO Collection (name, organisation_id) VALUES (?, ?)",
        [name, orgId]
    );

    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Collection WHERE id = ?",
        [insResult.insertId]
    );

    return rows[0] as Collection;
}

async function updateById(cid: number, fields: Partial<Collection>): Promise<Collection | null> {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    if (keys.length === 0) {
        throw new Error("No fields to update");
    }

    const setClause = keys.map(key => `${key} = ?`).join(", ");
    const query = `UPDATE Collection SET ${setClause} WHERE id = ?`;

    await pool.query<ResultSetHeader>(query, [...values, cid]);

    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Collection WHERE id = ?",
        [cid]
    );

    return rows[0] ? rows[0] as Collection : null;
}

async function removeById(cid: number): Promise<number> {
    const [delResult] = await pool.query<ResultSetHeader>(
        "DELETE FROM Collection WHERE id = ?",
        [cid]
    );

    return delResult.affectedRows
}


export default {
    getById,
    getByOrgId,
    create,
    updateById,
    removeById,
}