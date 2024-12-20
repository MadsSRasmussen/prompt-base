import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../configs/mysql";
import { Prompt } from "~/types/db";

async function getById(pid: number): Promise<Prompt & { organisation_id: number } | null> {
    const [prompts] = await pool.query<RowDataPacket[]>(
        "SELECT Prompt.*, Collection.organisation_id " + 
        "FROM Prompt " + 
        "INNER JOIN Collection ON Prompt.collection_id = Collection.id " +
        "WHERE Prompt.id = ?",
        [pid],
    );
    return prompts[0] as Prompt & { organisation_id: number } ?? null
};

async function getByCollId(cid: number): Promise<Prompt[]> {
    const [prompts] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Prompt WHERE collection_id = ?",
        [cid]
    );
    return prompts as Prompt[];
}

async function create(cid: number, name: string, content: string) {
    const [insResult] = await pool.query<ResultSetHeader>(
        "INSERT INTO Prompt (name, content, collection_id) VALUES (?, ?, ?)",
        [name, content, cid]
    )

    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Prompt WHERE id = ?",
        [insResult.insertId],
    );

    return rows[0] as Prompt;
}

async function updateById(pid: number, fields: Partial<Prompt>) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    
    if (keys.length === 0) {
        throw new Error("No fields to update");
    }

    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const query = `UPDATE Prompt SET ${setClause} WHERE id = ?`;
    
    await pool.query<ResultSetHeader>(query, [...values, pid]);
    
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Prompt WHERE id = ?", 
        [pid]
    )

    return rows[0] ? rows[0] as Prompt : null
}

async function removeById(pid: number): Promise<number> {
    const [delResult] = await pool.query<ResultSetHeader>(
        "DELETE FROM Prompt WHERE id = ?",
        [pid]
    );
    return delResult.affectedRows;
}

async function removeByCollId(cid: number): Promise<number> {
    const [delResult] = await pool.query<ResultSetHeader>(
        "DELETE FROM Prompt WHERE collection_id = ?",
        [cid],
    );
    return delResult.affectedRows;
}

export default {
    getById,
    getByCollId,
    create,
    updateById,
    removeById,
    removeByCollId,
}