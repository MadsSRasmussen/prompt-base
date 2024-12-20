import type { Collection } from "~/types/db";
import { authFetch } from "../utils/useAuthFetch";

export function useCollectionDelete<T extends Collection>(dataRef: Ref<Collection[] | null>) {

    const toast = useToast();

    const display = ref<boolean>(false);
    const pending = ref<boolean>(false);

    const collectionId = ref<number | null>(null);

    function displayModal(data: T) {
        collectionId.value = data.id;
        display.value = true;
    }

    async function submit() {
        if (!collectionId.value) throw new Error('Invalid collection id');
        if (!dataRef.value) throw new Error('No data');
        if (pending.value) return;

        pending.value = true;

        try {
            const result = await authFetch(`/api/collections/${collectionId.value}`, 'DELETE');
            const index = dataRef.value.findIndex(coll => coll.id === collectionId.value);
            const deletedCollection = dataRef.value.splice(index, 1);
            toast.add({ title: `'${deletedCollection[0].name}' was deleted` });
        } catch (error) {
            console.error('An error occured during collection delete');
        } finally {
            collectionId.value = null;
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