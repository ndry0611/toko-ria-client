export interface CarModel {
  id: number;
  id_car_brand: number;
  name: string;
  production_year: string;
  type: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface GetCarModel extends CarModel{
  CarBrand: CBModel
}

interface CBModel {
  name: string
  manufacture: string
}

export interface CarsFilter {
  id_car_brand?: string;
  name?: string;
  production_year?: string;
}
