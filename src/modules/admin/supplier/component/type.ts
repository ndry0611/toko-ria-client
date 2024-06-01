import * as Yup from "yup";

export interface SupplierModel {
  id: number;
  company_name: string;
  company_phone: string;
  pic_name: string;
  pic_phone: string;
  bank_account: string;
  bank_account_name: string;
  status: "ACTIVE" | "INACTIVE";
  address?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SupplierFilter {
  name_keyword?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export const SupplierFormSchema = () =>
  Yup.object({
    company_name: Yup.string().required(),
    company_phone: Yup.string().required(),
    pic_name: Yup.string().required(),
    pic_phone: Yup.string().required(),
    bank_account: Yup.string().required(),
    bank_account_name: Yup.string().required(),
    status: Yup.string().required(),
    address: Yup.string().optional(),
  });

export type SupplierFormType = Yup.InferType<
  ReturnType<typeof SupplierFormSchema>
> & {
  data?: SupplierModel;
};
