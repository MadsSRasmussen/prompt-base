import { z } from "zod";

export const CollectionsPostBodySchema = z.object({
    name: z.string(),
});

export const CollectionsPutBodySchema = z.object({
    name: z.string().optional()
});