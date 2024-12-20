import type { Prompt } from "~/types/db";
import { authFetch, useAuthFetch } from "../utils/useAuthFetch";
import { usePromptWrite } from "./usePromptWrite";

export function usePrompt(pid: number) {

    const store = useAuthFetch<Prompt>(`/api/prompts/${pid}`);
    const writer = usePromptWrite(pid, store.data);
    const name = computed(() => store.data.value?.name);

    const variablesRegex = /\{\{\s*(.*?)\s*\}\}/g
    const variables = computed(() => {
        const content = writer.content.value;
        const mathches: string[] = [];
        let match;
        while((match = variablesRegex.exec(content)) !== null) {
            mathches.push(match[1]);
        }
        return mathches;
    });

    return {
        store,
        writer,
        name,
        variables
    }

}