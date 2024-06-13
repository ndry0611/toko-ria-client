import * as Yup from "yup";
import { GetSpecialPriceModel } from "../../special-price/component/type";
import { GetSparePartModel } from "../../spare-part/component/type";

export interface SaleModel {
  id: number;
  id_user: number;
  code: string;
  payment_method: number;
  grand_total: number;
  payment_date?: string;
  expired_date?: string;
  status: number;
  snap_token?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetSalesModel extends SaleModel {
  User: SaleUserModel;
}

interface SaleUserModel {
  name: string;
  phone: string;
  address: string;
}

export interface GetSaleModel extends SaleModel {
  User: SaleUserModel;
  SaleDetail: SaleDetailsModel[];
}

export interface SaleDetailsModel {
  id: number;
  id_spare_part: number;
  SparePart: Omit<GetSparePartModel, "id_category">;
  quantity: number;
  price: number;
  total_price: number;
}

export interface SalesFilter {
  id_user?: string;
  code?: string;
  payment_method?: string;
  start_date?: string;
  end_date?: string;
  daftar?: string;
  status?: string;
}

export const SaleDetailFormSchema = () =>
  Yup.object({
    id_spare_part: Yup.string().default(""),
    quantity: Yup.number().default(0).min(1, "Kuantitas tidak boleh 0!"),
    price: Yup.number().default(0).min(1, "Harga tidak boleh 0!"),
    total_price: Yup.number().default(0),

    //additional information
    file_name: Yup.string().optional(),
    part_no: Yup.string().default(""),
    sell_method: Yup.string().default(""),
  });

export const SaleFormSchema = () =>
  Yup.object({
    id_user: Yup.string().default(""),
    code: Yup.string().default(""),
    payment_method: Yup.string().default(""),
    grand_total: Yup.number().default(0),
    payment_date: Yup.date().optional(),
    expired_date: Yup.date().optional(),
    status: Yup.string().default("4").required("Pilih status yang tersedia!"),
    sale_detail: Yup.array(SaleDetailFormSchema()).default([]),
  });

export const UpdateSaleFormSchema = () =>
  Yup.object({
    payment_date: Yup.date().optional(),
    expired_date: Yup.date().optional(),
    status: Yup.string().optional(),
  });

export type SaleFormType = Yup.InferType<ReturnType<typeof SaleFormSchema>> & {
  data?: GetSaleModel;
  specialPrices: GetSpecialPriceModel[];
};

export type UpdateSaleFormType = Yup.InferType<
  ReturnType<typeof UpdateSaleFormSchema>
> & {
  data?: GetSaleModel;
};

export type SaleDetailFormType = Yup.InferType<
  ReturnType<typeof SaleDetailFormSchema>
>;
