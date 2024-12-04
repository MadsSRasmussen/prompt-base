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

export interface ApiKey {
  id: number;
  hash: string;
  name: string;
  organisation_id: number;
}
