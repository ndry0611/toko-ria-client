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
    name: Yup.string().required(),
    manufacture: Yup.string().required(),
  });

export type SparePartBrandFormType = Yup.InferType<
  ReturnType<typeof SparePartBrandFormSchema>
> & { data?: SparePartBrandModel };
