import type { Prompt } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";

export function usePromptRename<T extends Prompt>(dataRef: Ref<Prompt[] | null>) {

    const toast = useToast();

    const name = ref<string>('');
    const display = ref<boolean>(false);
    const pending = ref<boolean>(false);

    const promptId = ref<number | null>(null);

    function displayModal(data: T) {
        name.value = data.name;
        promptId.value = data.id;
        display.value = true;
    }

    async function submit() {
        if (!promptId.value) throw new Error('Invalid prompt id');
        if (!name.value) throw new Error('Invalid name');
        if (!dataRef.value) throw new Error('No data');
        if (pending.value) return;

        pending.value = true;

        try {
            const response = await authFetch<Prompt>(`/api/prompts/${promptId.value}`, 'PUT', {
                name: name.value
            });
            const index = dataRef.value.findIndex(coll => coll.id === response.id);
            if (index === -1) throw new Error('Unable to find entry');

            dataRef.value[index] = response;
            toast.add({ title: `'${response.name}' was renamed` })
        } catch (error) {
            console.error('An error occured during prompt update');
        } finally {
            promptId.value = null;
            pending.value = false;
            display.value = false;
        }
    }

    return {
        name,
        display,
        pending,
        displayModal,
        submit,
    }

}