export interface INote {
  id: number;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
  last_updated?: string;
}
