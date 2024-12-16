import db from "~/server/utils/db";

export default defineEventHandler(async (event) => {
    const cid = getRouterParam(event, 'cid');
    if (!cid) createError({ status: 500 });

    return await db.prompt.getByCollId(Number(cid));
});