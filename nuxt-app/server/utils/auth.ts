import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "./configs/firebase"
import db from "./db";
import { User } from "~/types/db";

type RequiredHeaders = 'authorization' | 'x-mysql-user-id' | 'x-organisation'

export async function validateUserAndOrgAccess(headers: Record<RequiredHeaders, string>) {

    const promises: [Promise<DecodedIdToken>, Promise<User | null>, Promise<boolean>] = [
        verifyFirebaseToken(headers.authorization), 
        db.user.getById(Number(headers["x-mysql-user-id"])),
        db.user.userInOrg(Number(headers["x-mysql-user-id"]), Number(headers["x-organisation"])),
    ];
    const [token, user, userInOrg] = await Promise.all(promises);
    if (!user || !(token.uid === user.fb_user_id) || !userInOrg) throw createError({ status: 401 });

}

async function verifyFirebaseToken(authHeader: string) {
    const idToken = authHeader.split('Bearer ')[1];
    if (!idToken) throw createError({ status: 401 });
    return await auth.verifyIdToken(idToken);
}