import { RowDataPacket } from "mysql2";
import { pool } from "../configs/mysql";
import type { Collection, Prompt } from "~/types/db";
import prompt from "./prompt";
import collection from "./collection";
import user from "./user";

async function getCollectionsOfOrganisation() {
    const [collections] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Collection", 
    );

    return collections as Collection[];
}

export default {
    getCollectionsOfOrganisation,
    prompt,
    collection,
    user,
}