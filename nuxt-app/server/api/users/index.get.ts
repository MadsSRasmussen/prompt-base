import { auth } from "~/server/utils/configs/firebase";
import db from "~/server/utils/db";

export default defineEventHandler(async (event) => {
    const authorizationHeader = getHeader(event, 'Authorization');
    if (!authorizationHeader) throw createError({ status: 401 });

    const idToken = authorizationHeader.split('Bearer ')[1];

    const token = await auth.verifyIdToken(idToken);
    
    let user = await db.user.getByFbId(token.uid);
    if (!user) {    

        if (!token.email) throw createError({ status: 400 });

         user = await db.user.createUserAndPersonalOrg(
            token.uid,
            token.name,
            token.email
         );

         return user;
    } else {
        return user;
    }

});