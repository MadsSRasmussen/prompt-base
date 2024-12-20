import type { ApiKey } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";

export function useKeyCreate(dataRef: Ref<ApiKey[] | null>) {

    const toast = useToast();

    const name = ref<string>('');
    const createdKey = ref<string>('');
    const display = ref<boolean>(false);
    const displayCreated = ref<boolean>(false);
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
            const response = await authFetch<{ secretKey: string, entry: ApiKey }>('/api/keys', 'POST', {
                name: name.value
            });
            dataRef.value.push(response.entry);
            toast.add({ title: `'${response.entry.name}' was created` });
            createdKey.value = response.secretKey;            
        } catch (error) {
            console.error('An error occured submitting collection');
        } finally {
            pending.value = false;
            display.value = false;
            displayCreated.value = true;
        }
    }

    return {
        name,
        display,
        pending,
        createdKey,
        displayCreated,
        displayModal,
        submit,
    }

}