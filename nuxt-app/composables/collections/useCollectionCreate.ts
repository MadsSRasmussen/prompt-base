import type { Collection } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";
import type { ClientUser } from "~/types/client";

export function useCollectionCreate(dataRef: Ref<Collection[] | null>) {

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
            const response = await authFetch<Collection>('/api/collections', 'POST', {
                name: name.value
            });
            dataRef.value.push(response);
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