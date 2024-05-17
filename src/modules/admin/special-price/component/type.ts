import * as Yup from "yup";

export interface SpecialPriceModel {
  id: number;
  id_spare_part: number;
  id_user: number;
  price: number;
  created_at?: string;
  updated_at?: string;
}

export interface GetSpecialPriceModel extends SpecialPriceModel {
  SparePart: SP;
  User: U;
}

export interface SpecialPriceFilter {
  id_spare_part?: string;
  id_user?: string;
}

interface SP {
  name: string;
  capital_price: number;
  sale_price: number;
}

interface U {
  name: string;
  phone: string;
  address: string;
}

export const SpecialPriceFormSchema = () =>
  Yup.object({
    id_spare_part: Yup.string().required(),
    id_user: Yup.string().required(),
    price: Yup.number().required(),
  });

export type SpecialPriceFormType = Yup.InferType<
  ReturnType<typeof SpecialPriceFormSchema>
> & { data?: GetSpecialPriceModel };
