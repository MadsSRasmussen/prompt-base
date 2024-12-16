import type { Collection } from "~/types/db";
import { useAuthFetch } from "../utils/useAuthFetch";
import { useCollectionCreate } from "./useCollectionCreate";
import { useCollectionRename } from "./useCollectionRename";

export function useCollections() {

    const store = useAuthFetch<Collection[]>('/api/collections');
    const create = useCollectionCreate(store.data);
    const rename = useCollectionRename(store.data);


    return {
        store,
        create,
        rename,
    }

}