import type { Collection } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";

export function useCollectionRename<T extends Collection>(dataRef: Ref<Collection[] | null>) {

    const toast = useToast();

    const name = ref<string>('');
    const display = ref<boolean>(false);
    const pending = ref<boolean>(false);

    const collectionId = ref<number | null>(null);

    function displayModal(data: T) {
        name.value = data.name;
        collectionId.value = data.id;
        display.value = true;
    }

    async function submit() {
        if (!collectionId.value) throw new Error('Invalid collection id');
        if (!name.value) throw new Error('Invalid name');
        if (!dataRef.value) throw new Error('No data');
        if (pending.value) return;

        pending.value = true;

        try {
            const response = await authFetch<Collection>(`/api/collections/${collectionId.value}`, 'PUT', {
                name: name.value
            });
            const index = dataRef.value.findIndex(coll => coll.id === response.id);
            if (index === -1) throw new Error('Unable to find entry');
            dataRef.value[index] = response;
            toast.add({ title: `'${response.name}' was renamed` })
        } catch (error) {
            console.error('An error occurred during collection update');            
        } finally {
            collectionId.value = null;
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

};