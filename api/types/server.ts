export interface Prompt {
  id: number;
  name: string;
  content: string;
  collection_id: number;
}

export interface Collection {
  id: number;
  name: string;
  fb_user_id: string;
  organisation_id: number;
}

export interface ApiKey {
  id: number;
  hash: string;
  name: string;
  peek: string;
  created_at: string;
  organisation_id: number;
}
