import type { Collection } from "~/types/db";
import { useAuthFetch } from "../utils/useAuthFetch";
import { useCollectionCreate } from "./useCollectionCreate";
import { useCollectionRename } from "./useCollectionRename";
import { useCollectionDelete } from "./useCollectionDelete";

export function useCollections() {

    const store = useAuthFetch<Collection[]>('/api/collections');
    const create = useCollectionCreate(store.data);
    const rename = useCollectionRename(store.data);
    const remove = useCollectionDelete(store.data);

    return {
        store,
        create,
        rename,
        remove,
    }

}