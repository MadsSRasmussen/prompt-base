import type { AsyncDataRequestStatus } from "#app";
import type { ClientUser } from "~/types/client";
import { useCurrentUser } from "../firebase/useCurrentUser";
import type { NitroFetchRequest } from "nitropack"

type AllowedMethod = 'GET' | 'POST' | 'PUT'

export function useAuthFetch<T>(request: NitroFetchRequest, method: AllowedMethod = 'GET', body?: Record<string, any>) {

    const { user } = useCurrentUser();
    const data: Ref<T | null> = ref(null);
    const status: Ref<AsyncDataRequestStatus> = ref('idle');

    async function refresh() {

        status.value = 'pending';

        if (!user.value) {
            status.value = 'error';
            throw new Error('No user');
        }

        try {
            const response = await $fetch<T>(request, {
                method: method,
                headers: {
                    'authorization': `Bearer ${await user.value.fb.getIdToken()}`,
                    'x-mysql-user-id':`${user.value.id}`,
                    'x-organisation': `${user.value.personalOrganisationId}`
                },
                ...(body && { body })
            });
    
            data.value = response as T;
            status.value = 'success';
            
        } catch (error) {
            status.value = 'error';
            data.value = null;
            throw error;
        }

    }

    refresh();

    return {
        data,
        status, 
        refresh
    }

}

export async function authFetch<T>(request: NitroFetchRequest, method: AllowedMethod = 'GET', body?: Record<string, any>) {
    const { user } = useCurrentUser();
    if (!user.value) throw new Error('No user');

    const response = await $fetch<T>(request, {
        method: method,
        headers: {
            'authorization': `Bearer ${await user.value.fb.getIdToken()}`,
            'x-mysql-user-id':`${user.value.id}`,
            'x-organisation': `${user.value.personalOrganisationId}`
        },
        ...(body && { body })
    });

    return response as T
}