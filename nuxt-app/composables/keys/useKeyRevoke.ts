import type { ApiKey } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";

export function useKeyRevoke<T extends ApiKey>(dataRef: Ref<ApiKey[] | null>) {

    const toast = useToast();

    const display = ref<boolean>(false);
    const pending = ref<boolean>(false);

    const keyId = ref<number | null>(null);

    function displayModal(data: T) {
        keyId.value = data.id;
        display.value = true;
    }

    async function submit() {
        if (!keyId.value) throw new Error('Invalid key id');
        if (!dataRef.value) throw new Error('No data');
        if (pending.value) return;

        pending.value = true;

        try {
            const result = await authFetch(`/api/keys/${keyId.value}`, 'DELETE');
            const index = dataRef.value.findIndex(key => key.id === keyId.value);
            const deletedKey = dataRef.value.splice(index, 1);
            toast.add({ title: `'${deletedKey[0].name}' was deleted` });
        } catch (error) {
            console.error('An error occured during key revoke');
        } finally {
            keyId.value = null;
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