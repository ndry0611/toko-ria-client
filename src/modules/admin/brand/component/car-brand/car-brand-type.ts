import * as Yup from "yup"

export interface CarBrandModel {
  id: number;
  name: string;
  manufacture: string;
  created_at?: string;
  updated_at?: string;
}

export const CarBrandFormSchema = () => Yup.object({
  name: Yup.string().required("Nama merk mobil tidak boleh kosong!"),
  manufacture: Yup.string().required("Nama manufaktur mobil tidak boleh kosong!")
});

export type CarBrandFormType = Yup.InferType<ReturnType<typeof CarBrandFormSchema>> & {data?: CarBrandModel}