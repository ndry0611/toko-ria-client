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
    company_name: Yup.string().required("Nama perusahaan tidak boleh kosong!"),
    company_phone: Yup.string().required("Nomor telepon tidak boleh kosong!"),
    pic_name: Yup.string().required("Nama penanggung jawab tidak boleh kosong!"),
    pic_phone: Yup.string().required("Nomor telepon tidak boleh kosong!"),
    bank_account: Yup.string().required("Informasi Bank tidak boleh kosong!"),
    bank_account_name: Yup.string().required("Nama Rekening tidak boleh kosong!"),
    status: Yup.string().required("Pilih status tersedia!"),
    address: Yup.string().optional(),
  });

export type SupplierFormType = Yup.InferType<
  ReturnType<typeof SupplierFormSchema>
> & {
  data?: SupplierModel;
};
