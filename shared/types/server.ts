export interface Prompt {
  id: number;
  name: string;
  content: string;
  collection_id: number;
}

export interface Collection {
  id: number;
  name: string;
  publlic: boolean;
  fb_user_id: string;
  organisation_id: number;
}
