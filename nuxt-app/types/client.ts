import type { User } from "firebase/auth"

type FbUser = User;

export type ClientUser = {
    fb: FbUser,
    id: number,
    personalOrganisationId: number,
}