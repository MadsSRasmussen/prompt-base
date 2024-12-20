import { validateUserAndOrgAccess } from "~/server/utils/auth";
import db from "~/server/utils/db"
import { assertHeaders, parseBody } from "~/server/utils/request-helpers";
import { CollectionsPromptPostBodySchema } from "~/server/utils/schemas/request";

export default defineEventHandler(async (event) => {
    const headers = assertHeaders(event, ['authorization', 'x-mysql-user-id', 'x-organisation']);
    const body = await parseBody(event, CollectionsPromptPostBodySchema);
    await validateUserAndOrgAccess(headers);

    const cid = getRouterParam(event, 'cid');
    if (!cid) throw createError({ status: 500 });

    const collection = await db.collection.getById(Number(cid));
    if (!collection) throw createError({ status: 404 });
    if (collection.organisation_id !== Number(headers["x-organisation"])) throw createError({ status: 401 });

    return await db.prompt.create(Number(cid), body.name, body.content);
});