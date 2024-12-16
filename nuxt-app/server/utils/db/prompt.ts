import { RowDataPacket } from "mysql2";
import { pool } from "../configs/mysql";
import { Prompt } from "~/types/db";

async function getById(pid: number): Promise<Prompt | null> {
    const [prompts] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Prompt WHERE id = ?",
        [pid],
    );
    return prompts[0] as Prompt ?? null
};

async function getByCollId(cid: number): Promise<Prompt[]> {
    const [prompts] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Prompt WHERE collection_id = ?",
        [cid]
    );
    return prompts as Prompt[];
}

export default {
    getById,
    getByCollId,
}