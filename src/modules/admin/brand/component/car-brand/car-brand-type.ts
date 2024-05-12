import * as Yup from "yup"

export interface CarBrandModel {
  id: number;
  name: string;
  manufacture: string;
  created_at?: string;
  updated_at?: string;
}

export const CarBrandFormSchema = () => Yup.object({
  name: Yup.string().required(),
  manufacture: Yup.string().required()
});

export type CarBrandFormType = Yup.InferType<ReturnType<typeof CarBrandFormSchema>> & {data?: CarBrandModel}