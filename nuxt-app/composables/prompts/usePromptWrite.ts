import type { Prompt } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";

export function usePromptWrite(pid: number, dataRef: Ref<Prompt | null>) {

    const pending = ref<boolean>(false);
    const content = ref<string>(dataRef.value?.content || '');
    const inSync = computed(() => content.value == dataRef.value?.content);
    watch(() => dataRef.value, (data) => {
        if (!data) return;
        content.value = data.content;
    });

    async function write() {
        if (pending.value) return;

        pending.value = true;
        try {
            const response = await authFetch<Prompt>(`/api/prompts/${pid}`, 'PUT', {
                content: content.value
            });
            dataRef.value = response;
            content.value = response.content;
        } catch (error) {
            console.error('An error occured during prompt write');
        } finally {
            pending.value = false;
        }
    }

    return {
        pending,
        content,
        inSync,
        write,
    }

}