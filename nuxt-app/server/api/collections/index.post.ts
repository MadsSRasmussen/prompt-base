import { validateUserAndOrgAccess } from "~/server/utils/auth";
import db from "~/server/utils/db"
import { assertHeaders, parseBody } from "~/server/utils/request-helpers";
import { CollectionsPostBodySchema } from "~/server/utils/schemas/request";

export default defineEventHandler(async (event) => {

    // await new Promise(r => setTimeout(r, 3000));

    const headers = assertHeaders(event, ['authorization', 'x-mysql-user-id', 'x-organisation']);
    const body = await parseBody(event, CollectionsPostBodySchema);
    await validateUserAndOrgAccess(headers);
    
    return await db.collection.create(body.name, Number(headers["x-organisation"]));
});