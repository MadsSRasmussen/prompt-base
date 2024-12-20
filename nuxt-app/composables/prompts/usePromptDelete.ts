import type { Prompt } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";

export function usePromptDelete<T extends Prompt>(dataRef: Ref<Prompt[] | null>) {

    const toast = useToast();

    const display = ref<boolean>(false);
    const pending = ref<boolean>(false);

    const promptId = ref<number | null>(null);

    function displayModal(data: T) {
        promptId.value = data.id;
        display.value = true;
    }

    async function submit() {
        if (!promptId.value) throw new Error('Invalid prompt id');
        if (!dataRef.value) throw new Error('No data');
        if (pending.value) return;

        pending.value = true;

        try {
            const result = await authFetch(`/api/prompts/${promptId.value}`, 'DELETE');
            const index = dataRef.value.findIndex(prompt => prompt.id === promptId.value);
            const deletedPrompts = dataRef.value.splice(index, 1);
            toast.add({ title: `'${deletedPrompts[0].name}' was deleted` })
        } catch (error) {
            console.error('An error occured during prompt deletion')
        } finally {
            promptId.value = null;
            pending.value = false;
            display.value = false;
        }
    }

    return {
        display,
        pending,
        displayModal,
        submit,
    }

}