export interface Category {
  id: number;
  name: string;
  description: string;
  file_name: string | null;
  created_at?: string;
  updated_at?: string;
}
