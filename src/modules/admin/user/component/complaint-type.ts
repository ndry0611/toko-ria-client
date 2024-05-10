export interface GetComplaintsModel {
  id: number;
  id_user: number;
  User: {
    name: string;
    phone: string;
  };
  complaint: string;
  created_at?: string;
  updated_at?: string;
}

export interface ComplaintFilter {
  name: string;
}