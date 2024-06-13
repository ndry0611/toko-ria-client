import * as Yup from "yup";

export interface CategoryModel {
  id: number;
  name: string;
  description: string;
  file_name: string | null;
  created_at?: string;
  updated_at?: string;
}

export const CategoryFormSchema = () =>
  Yup.object({
    name: Yup.string().required("Nama kategori tidak boleh kosong!"),
    description: Yup.string().required("Deskripsi tidak boleh kosong!"),
  });

export type CategoryFormType = Yup.InferType<
  ReturnType<typeof CategoryFormSchema>
> & { data?: CategoryModel };