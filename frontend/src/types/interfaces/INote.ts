export interface INote {
  id: string | undefined | number;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
}
