export interface StockAdjustmentModel {
  id: number;
  code: string;
  id_spare_part: number;
  old_quantity: number;
  new_quantity: number;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface StockAdjustmentFilter {
  id_spare_part?: number;
  start_date?: string;
  end_date?: string;
}

export interface GetStockAdjustmentModel extends StockAdjustmentModel {
  SparePart: SPModel;
}

interface SPModel {
  id_spare_part_brand: number;
  SparePartBrand: SPBModel;
  name: string;
  stock: number;
}

interface SPBModel {
  name: string;
}
