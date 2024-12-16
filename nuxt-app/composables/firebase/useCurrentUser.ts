import { onAuthStateChanged, signInWithPopup, type Unsubscribe, GoogleAuthProvider } from "firebase/auth";
import { useFirebase } from "./useFirebase";
import type { ClientUser } from "~/types/client";

const user = ref<ClientUser | null>(null);
let unsubscribe: Unsubscribe | null = null;
let listenerCount: number = 0;

export async function getCurrentUser(): Promise<ClientUser | null> {
    if (user.value) return user.value;

    return new Promise((resolve) => {
        const { auth } = useFirebase();
        const unsubscribeLocal = onAuthStateChanged(auth, async (fbUser) => {
            
            if (!fbUser) {
                resolve(fbUser);
                return;
            }

            const idToken = await fbUser.getIdToken();
            const dbUser = await $fetch('/api/users', {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            user.value = {
                fb: fbUser,
                id: dbUser.id,
                personalOrganisationId: dbUser.personal_organisation_id
            }

            resolve(user.value);
            unsubscribeLocal();
        });
    })
}

function initializeAuthListener() {
    const { auth } = useFirebase();
    if (!unsubscribe) {
        unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            if (!fbUser) {
                user.value = fbUser;
            } else {
                const idToken = await fbUser.getIdToken();
                const dbUser = await $fetch('/api/users', {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                });
                user.value = {
                    fb: fbUser,
                    id: dbUser.id,
                    personalOrganisationId: dbUser.personal_organisation_id
                }
            }
        });
    };
    listenerCount++;
}

function cleanupAuthListener() {
    listenerCount--;
    if (listenerCount === 0 && unsubscribe) {
        unsubscribe();
    }
}

export function useCurrentUser() {
    const { auth } = useFirebase();

    async function signInUserWithPopup(): Promise<void> {
        if (user.value) return;

        await signInWithPopup(auth, new GoogleAuthProvider());
        await getCurrentUser();
    }

    onMounted(() => {
        initializeAuthListener();
    });

    onUnmounted(() => {
        cleanupAuthListener();
    })

    return {
        user,
        getCurrentUser,
        signInUserWithPopup,
    }

}