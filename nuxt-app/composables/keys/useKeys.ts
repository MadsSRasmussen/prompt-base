import type { ApiKey } from "~/types/db";
import { useAuthFetch } from "../utils/useAuthFetch";
import { useKeyCreate } from "./useKeyCreate";
import { useKeyRevoke } from "./useKeyRevoke";

export function useKeys() {

    const store = useAuthFetch<ApiKey[]>('/api/keys');
    const create = useKeyCreate(store.data);
    const revoke = useKeyRevoke(store.data);

    return {
        store,
        create,
        revoke,
    }

}