import db from "~/server/utils/db";
import { PromptsPutBodySchema } from "~/server/utils/schemas/request";

export default defineEventHandler(async (event) => {

    const headers = assertHeaders(event, ['authorization', 'x-mysql-user-id', 'x-organisation']);
    const body = await parseBody(event, PromptsPutBodySchema);
    await validateUserAndOrgAccess(headers);

    const pid = getRouterParam(event, 'pid');
    if (!pid) throw createError({ status: 500 });

    const prompt = await db.prompt.getById(Number(pid));
    if (!prompt) throw createError({ status: 404 });
    if (prompt.organisation_id !== Number(headers["x-organisation"])) throw createError({ status: 401 });

    const updatedPrompt = await db.prompt.updateById(prompt.id, body);
    if (!updatedPrompt) throw createError({ status: 500 });

    return updatedPrompt;
})