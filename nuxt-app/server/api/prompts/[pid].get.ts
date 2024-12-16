import db from "~/server/utils/db";

export default defineEventHandler(async (event) => {

    const pid = getRouterParam(event, 'pid');
    if (!pid) createError({ status: 500 });

    return await db.prompt.getById(Number(pid));
});