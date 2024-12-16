import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const credentials = useRuntimeConfig().firebaseAdmin as ServiceAccount;

const app = initializeApp({ credential: cert(credentials) });

const auth = getAuth();

export { app, auth };