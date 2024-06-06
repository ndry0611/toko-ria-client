import * as Yup from "yup";
import {
  GetSparePartModel,
  SPBrand,
  SPCar,
} from "../../../admin/spare-part/component/type";

export interface CartModel {
  id: number;
  id_user: number;
  grand_total: number;
  CartDetail: CartDetailModel[];
  created_at?: string;
  updated?: string;
}

export interface CartDetailModel {
  id: number;
  id_spare_part: number;
  SparePart: CartSparePart;
  quantity: number;
  price: number;
  total_price: number;
  created_at?: string;
  updated_at?: string;
}

export interface CartSparePart {
  id_spare_part_brand?: number;
  SparePartBrand?: SPBrand;
  id_car?: number;
  Car?: SPCar;
  name: string;
  part_no: string;
  genuine?: string;
  stock: number;
  capital_price?: number;
  sell_method?: string;
  is_available: boolean;
  sale_price?: number;
  description?: string;
  file_name?: string | null;
}

export const AddCartDetailSchema = () =>
  Yup.object({
    id_spare_part: Yup.string().optional(),
    quantity: Yup.number().required(),
    price: Yup.number().required().min(1, "Minimal pembelian harus 1"),
  });

export type AddCartDetailFormType = Yup.InferType<
  ReturnType<typeof AddCartDetailSchema>
>;
