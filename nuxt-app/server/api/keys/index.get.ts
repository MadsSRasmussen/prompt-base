import db from "~/server/utils/db";

export default defineEventHandler(async (event) => {
    const headers = assertHeaders(event, ['authorization', 'x-mysql-user-id', 'x-organisation']);
    await validateUserAndOrgAccess(headers);

    return await db.key.getByOrgId(Number(headers["x-organisation"]));
});