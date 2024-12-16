import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "../configs/mysql";
import type { User } from "~/types/db";

async function getById(userId: number) {
    const [users] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM User WHERE id = ?",
        [userId],
    );
    return users[0] ? users[0] as User : null;
}

async function getByFbId(fbId: string): Promise<User | null> {
    const [users] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM User WHERE fb_user_id = ?",
        [fbId]
    );
    return users[0] ? users[0] as User : null;
};

async function createUserAndPersonalOrg(fbId: string, displayName: string, email: string) {

    const conn = await pool.getConnection();
    conn.beginTransaction();

    try {
        const [orgResult] = await conn.execute<ResultSetHeader>(
            "INSERT INTO Organisation (name) VALUES (?)",
            ['Personal']
        );
        const [usrResult] = await conn.execute<ResultSetHeader>(
            "INSERT INTO User (fb_user_id, personal_organisation_id, display_name, email) " +
            "VALUES (?, ?, ?, ?) ",
            [fbId, orgResult.insertId, displayName, email] 
        );
        const [orgUsrResult] = await conn.execute<ResultSetHeader>(
            "INSERT INTO OrganisationUser (organisation_id, user_id) VALUES (?, ?)",
            [orgResult.insertId, usrResult.insertId]
        )
        conn.commit();

        return {
            id: usrResult.insertId,
            fb_user_id: fbId,
            personal_organisation_id: orgResult.insertId,
            display_name: displayName,
            email: email,
        }
    } catch (error) {
        conn.rollback();
        throw error;
    } finally {
        conn.release();
    }

}

async function userInOrg(userId: number, orgId: number): Promise<boolean> {
    const [userOrg] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM OrganisationUser WHERE user_id = ? AND organisation_id = ?",
        [userId, orgId],
    )

    return !!userOrg[0];
}

export default {
    getById,
    getByFbId,
    createUserAndPersonalOrg,
    userInOrg,
}