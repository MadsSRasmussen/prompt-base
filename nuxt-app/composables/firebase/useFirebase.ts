import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;

export function useFirebase(): { firebaseApp: FirebaseApp; auth: Auth } {

    const config = useRuntimeConfig().public.firebase;

    if (!firebaseApp) {
        firebaseApp = initializeApp({
            apiKey: config.apiKey as string,
            authDomain: config.authDomain as string,
            projectId: config.projectId as string,
            storageBucket: config.storageBucket as string,
            messagingSenderId: config.messagingSenderId as string,
            appId: config.appId as string,
        })
    };
    auth = getAuth(firebaseApp);

    if (!(firebaseApp || auth)) throw new Error('Failed to initialize Firebase');

    return {
        firebaseApp,
        auth,
    }
}