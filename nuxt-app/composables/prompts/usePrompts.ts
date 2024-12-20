import type { Prompt } from "~/types/db";
import { useAuthFetch } from "../utils/useAuthFetch";
import { usePromptCreate } from "./usePromptCreate";
import { usePromptRename } from "./usePromptRename";
import { usePromptDelete } from "./usePromptDelete";

export function usePrompts(cid: number) {

    const store = useAuthFetch<Prompt[]>(`/api/collections/${cid}`);
    const create = usePromptCreate(cid, store.data);
    const rename = usePromptRename(store.data);
    const remove = usePromptDelete(store.data);

    return {
        store,
        create,
        rename,
        remove,
    }

}