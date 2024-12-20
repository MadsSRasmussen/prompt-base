import type { Prompt } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";

export function usePromptCreate(cid: number, dataRef: Ref<Prompt[] | null>) {

    const toast = useToast();

    const name = ref<string>('');
    const display = ref<boolean>(false);
    const pending = ref<boolean>(false);

    function displayModal() {
        name.value = '';
        display.value = true;
    }

    async function submit() {
        if (!name.value) throw new Error('Invalid name');
        if (!dataRef.value) throw new Error('Invalid data');
        if (pending.value) return;

        pending.value = true;
        
        try {
            const response = await authFetch<Prompt>(`/api/collections/${cid}`, 'POST', {
                name: name.value,
                content: '',
            });
            dataRef.value.push(response);
            toast.add({ title: `'${response.name}' was created` })
        } catch (error) {
            console.error('An error occured submitting collection');
        } finally {
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