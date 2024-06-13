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
    id_spare_part: Yup.string().required("Barang tidak boleh kosong!"),
    id_user: Yup.string().required("Pelanggan tidak boleh kosong!"),
    price: Yup.number().required("Harga khusus tidak boleh kosong!"),
  });

export const MultipleSpecialPriceFormSchema = () =>
  Yup.object({
    id_spare_part: Yup.string().required("Barang tidak boleh kosong!"),
    special_prices: Yup.array(PricesFormSchema()).default([]),
  });

export const PricesFormSchema = () =>
  Yup.object({
    id_user: Yup.string().default(""),
    price: Yup.number().default(0).min(1, "Harga tidk boleh 0!"),
  });

export type MultipleSpecialPriceFormType = Yup.InferType<
  ReturnType<typeof MultipleSpecialPriceFormSchema>
>;

export type PricesFormType = Yup.InferType<ReturnType<typeof PricesFormSchema>>;

export type SpecialPriceFormType = Yup.InferType<
  ReturnType<typeof SpecialPriceFormSchema>
> & { data?: GetSpecialPriceModel };
