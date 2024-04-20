interface SparePart {
  id: number;
  id_spare_part_brand?: number;
  SparePartBrand?: SparePartBrand | null;
  id_category?: number;
  id_car?: number;
  Car?: Car | null;
  id_supplier?: number;
  name?: string;
  part_no?: string;
  genuine?: boolean;
  stock?: number;
  capital_price?: number;
  sell_method?: number;
  is_available?: boolean;
  sale_price?: number;
  description?: string;
  supply_date?: string;
  file_name?: string | null;
  created_at?: string;
  updated_at?: string;
}