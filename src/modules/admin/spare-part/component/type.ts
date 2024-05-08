import * as Yup from 'yup';

export interface SparePartModel {
  id: number;
  id_spare_part_brand?: number;
  id_category?: number;
  id_car?: number;
  id_supplier?: number;
  name: string;
  part_no: string;
  genuine?: boolean;
  stock: number;
  capital_price?: number;
  sell_method?: number;
  is_available: boolean;
  sale_price?: number;
  description?: string;
  supply_date?: string;
  file_name?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SparePartsFilter {
  id_category?: string,
  id_car_brand?:string,
  id_car?:string
  name?: string
}

export interface GetSparePartModel extends SparePartModel {
  SparePartBrand: SPBrand | null;
  Car?: SPCar | null;
}

interface SPBrand {
  name: string;
  manufacture: string;
}

interface SPCar {
  id_car_brand: number;
  CarBrand: SPCBrand;
  name: string;
  production_year: string;
  type: string
}

interface SPCBrand {
  name: string;
}

export const SparePartFormSchema = () => 
  Yup.object({
    id_category: Yup.number().required(),
    id_spare_part_brand: Yup.number().required(),
    id_car: Yup.number().optional(),
    id_supplier: Yup.number().optional(),
    name: Yup.string().required(),
    part_no: Yup.string().required(),
    genuine: Yup.boolean().required(),
    stock: Yup.number().default(0),
    capital_price: Yup.number().required(),
    sell_method: Yup.number().oneOf([0,1]).required(),
    is_available: Yup.boolean().required(),
    sale_price: Yup.number().required(),
    description: Yup.string().required(),
    supply_date: Yup.string().required(),
  });

export type SparePartFormType = Yup.InferType<ReturnType<typeof SparePartFormSchema>> & {data?: SparePartModel};