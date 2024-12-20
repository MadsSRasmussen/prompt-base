import { z } from "zod";

export const CollectionsPostBodySchema = z.object({
    name: z.string(),
});

export const CollectionsPutBodySchema = z.object({
    name: z.string().optional()
});

export const CollectionsPromptPostBodySchema = z.object({
    name: z.string(),
    content: z.string(),
})

export const PromptsPutBodySchema = z.object({
    name: z.string().optional(),
    content: z.string().optional(),
});

export const KeysPostBodySchema = z.object({
    name: z.string()
});