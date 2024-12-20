import db from "~/server/utils/db";

export default defineEventHandler(async (event) => {
    const headers = assertHeaders(event, ['authorization', 'x-mysql-user-id', 'x-organisation']);
    await validateUserAndOrgAccess(headers);

    const kid = getRouterParam(event, 'kid');
    if (!kid) throw createError({ status: 500 });

    const key = await db.key.getById(Number(kid));
    if (!key) throw createError({ status: 404 });
    if (key.organisation_id !== Number(headers["x-organisation"])) throw createError({ status: 401 });

    const deletedKeys = await db.key.removeById(key.id);

    return {
        deletions: {
            keys: deletedKeys
        }
    }
});