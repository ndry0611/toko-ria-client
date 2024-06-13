import * as Yup from "yup";

export interface SparePartModel {
  id: number;
  id_spare_part_brand?: number;
  id_category?: number;
  id_car?: number;
  id_supplier?: number;
  name: string;
  part_no: string;
  genuine?: string;
  stock: number;
  capital_price?: number;
  sell_method?: string;
  is_available: boolean;
  sale_price?: number;
  description?: string;
  supply_date?: string;
  file_name?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SparePartsFilter {
  id_category?: string;
  id_car_brand?: string;
  id_car?: string;
  name?: string;
  available?: "true" | "false"
}

export interface GetSparePartModel extends SparePartModel {
  SparePartBrand: SPBrand | null;
  Car?: SPCar | null;
  SpecialPrice: SPrice[];
}

interface SPrice {
  id: number;
  price: number;
}

export interface SPBrand {
  name: string;
  manufacture: string;
}

export interface SPCar {
  id_car_brand: number;
  CarBrand: SPCBrand;
  name: string;
  production_year: string;
  type: string;
}

export interface SPCBrand {
  name: string;
}

export const SparePartFormSchema = () =>
  Yup.object({
    id_category: Yup.string().required("Kategori tidak boleh kosong!"),
    id_spare_part_brand: Yup.string().required("Merk barang tidak boleh kosong!"),
    id_car: Yup.string().optional(),
    id_supplier: Yup.string().optional(),
    name: Yup.string().required("Nama barang tidak boleh kosong!"),
    part_no: Yup.string().required("Part number tidak boleh kosong!"),
    genuine: Yup.string().oneOf(["asli", "replika"]),
    stock: Yup.number().default(0),
    capital_price: Yup.number().required("Harga modal tidak boleh kosong!"),
    sell_method: Yup.string().oneOf(["pcs", "set"]),
    is_available: Yup.boolean(),
    sale_price: Yup.number().required("Harga jual tidak boleh kosong!"),
    description: Yup.string().required("Deskripsi barang tidak boleh kosong!"),
    supply_date: Yup.date().required("Tanggal suplai tidak boleh kosong!"),
  });

export type SparePartFormType = Yup.InferType<
  ReturnType<typeof SparePartFormSchema>
> & { data?: GetSparePartModel };
