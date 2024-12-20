import { validateUserAndOrgAccess } from "~/server/utils/auth";
import db from "~/server/utils/db"
import { assertHeaders } from "~/server/utils/request-helpers";

export default defineEventHandler(async (event) => {

    // await new Promise(r => setTimeout(r, 3000));

    const headers = assertHeaders(event, ['authorization', 'x-mysql-user-id', 'x-organisation']);
    await validateUserAndOrgAccess(headers);

    return await db.collection.getByOrgId(Number(headers["x-organisation"]));
});