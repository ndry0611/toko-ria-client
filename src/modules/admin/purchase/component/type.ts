import { GetSparePartModel } from "../../spare-part/component/type";
import * as Yup from "yup";
import { GetSpecialPriceModel } from "../../special-price/component/type";

export interface PurchaseModel {
  id: number;
  id_supplier: number;
  code: string;
  purchase_date: string;
  grand_total: number;
  status: number;
  payment_date?: string;
  credit_duration: number;
  created_at?: string;
  updated_at?: string;
}

export interface PurchaseFilter {
  id_supplier?: string;
  code?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
}

export interface GetPurchasesModel extends PurchaseModel {
  Supplier: {
    company_name: string;
  };
}

export interface GetPurchaseModel extends PurchaseModel {
  PurchaseDetail: PurchaseDetailsModel[];
}

export interface PurchaseDetailsModel {
  id: number;
  id_spare_part: number;
  SparePart: Omit<GetSparePartModel, "id_category">;
  quantity: number;
  price: number;
  discount: number;
  total_price: number;
}

export const PurchaseFormSchema = () =>
  Yup.object({
    id_supplier: Yup.string().default(""),
    code: Yup.string().default(""),
    purchase_date: Yup.date().required(),
    grand_total: Yup.number().default(0),
    payment_date: Yup.date().optional(),
    credit_duration: Yup.number().default(0),
    status: Yup.string().default(""),
    purchase_detail: Yup.array(PurchaseDetailSchema()).default([]),
  });

export const PurchaseDetailSchema = () =>
  Yup.object({
    id_spare_part: Yup.string().default(""),
    quantity: Yup.number().default(0).min(1, "Kuantitas tidak boleh 0!"),
    price: Yup.number().default(0),
    discount: Yup.number().default(0),
    total_price: Yup.number().default(0),

    //additional information
    file_name: Yup.string().optional(),
    part_no: Yup.string().default(""),
    sell_method: Yup.string().default(""),
  });

export const UpdatePurchaseFormSchema = () =>
  Yup.object({
    code: Yup.string().optional(),
    purhase_date: Yup.date().optional(),
    payment_date: Yup.date().optional(),
    credit_duration: Yup.number().optional(),
    status: Yup.string().optional(),
  });

export type UpdatePurchaseFormType = Yup.InferType<
  ReturnType<typeof UpdatePurchaseFormSchema>
> & {
  data?: GetPurchaseModel;
};

export type PurchaseFormType = Yup.InferType<
  ReturnType<typeof PurchaseFormSchema>
> & {
  data?: GetPurchaseModel;
  specialPrices: GetSpecialPriceModel[];
};

export type PurchaseDetailFormType = Yup.InferType<
  ReturnType<typeof PurchaseDetailSchema>
>;
