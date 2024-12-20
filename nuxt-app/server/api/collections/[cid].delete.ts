import db from "~/server/utils/db";

export default defineEventHandler(async (event) => {

    const headers = assertHeaders(event, ['authorization', 'x-mysql-user-id', 'x-organisation']);
    await validateUserAndOrgAccess(headers);

    const cid = getRouterParam(event, 'cid');
    if (!cid) throw createError({ status: 500 });

    const collection = await db.collection.getById(Number(cid));
    if (!collection) throw createError({ status: 404 });
    if (collection.organisation_id !== Number(headers["x-organisation"])) throw createError({ status: 401 });

    const deletedPrompts = await db.prompt.removeByCollId(collection.id);
    const deletedCollections = await db.collection.removeById(collection.id);

    return {
        deletions: {
            prompts: deletedPrompts,
            collections: deletedCollections,
        }
    }

});