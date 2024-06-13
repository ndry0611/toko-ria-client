import * as Yup from "yup";

export interface SparePartBrandModel {
  id: number;
  name: string;
  manufacture: string;
  created_at?: string;
  updated_at?: string;
}

export const SparePartBrandFormSchema = () =>
  Yup.object({
    name: Yup.string().required("Nama merk barang tidak boleh kosong!"),
    manufacture: Yup.string().required("Nama manufaktur tidak boleh kosong!"),
  });

export type SparePartBrandFormType = Yup.InferType<
  ReturnType<typeof SparePartBrandFormSchema>
> & { data?: SparePartBrandModel };
