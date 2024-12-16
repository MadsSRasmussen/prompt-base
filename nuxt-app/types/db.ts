export type Collection = {
    id: number,
    name: string,
    fb_user_id: string,
    created_at: string,
    organisation_id: number,
}

export type Prompt = {
    id: number,
    name: string,
    content: string,
    created_at: string,
    collection_id: number,
}

export type User = {
    id: number,
    fb_user_id: string,
    personal_organisation_id: number,
    display_name: string,
    email: string,
}