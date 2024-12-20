import { KeysPostBodySchema } from "~/server/utils/schemas/request";
import { ApiKey } from "~/types/db";

export default defineEventHandler(async (event) => {
    const headers = assertHeaders(event, ['authorization', 'x-mysql-user-id', 'x-organisation']);
    await validateUserAndOrgAccess(headers);

    const body = await parseBody(event, KeysPostBodySchema);

    const expressConfig = useRuntimeConfig().express;

    const response = await $fetch(`http://${expressConfig.host}:${expressConfig.port}/api/v1/keys`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ap-${expressConfig.adminKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: body.name,
            organisation: headers["x-organisation"],
        })
    });

    return response as { secretKey: string, entry: ApiKey }
});