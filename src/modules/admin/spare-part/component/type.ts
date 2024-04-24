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