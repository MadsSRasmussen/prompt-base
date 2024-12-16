import { getHeaders } from 'h3';
import type { H3Event, EventHandlerRequest } from 'h3';
import type { ZodObject, ZodRawShape } from 'zod';

export function assertHeaders<T extends string>(event: H3Event<EventHandlerRequest>, picks: T[]): Record<T, string> {
    const headers = getHeaders(event);
    const result = {} as Record<T, string>;

    for (const pick of picks) {
        if (!(pick in headers)) {
            console.log(pick);
            throw createError({ status: 400, message: `Header "${pick}" is missing from the request.` });
        }
        result[pick] = headers[pick] as string;
    }

    return result;
}

export async function parseBody<T extends ZodRawShape>(event: H3Event<EventHandlerRequest>, zodObject: ZodObject<T>) {
    try {
        const body = await readBody(event);
        return zodObject.parse(body);
    } catch (error) {
        throw createError({
            statusCode: 400
        })
    }
}