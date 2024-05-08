import { useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";

// will be moved to /car/component/type.ts
export interface CarModel {
  id: number;
  id_car_brand: number;
  name: string;
  production_year: string;
  type: string | null;
  created_at?: string;
  updated_at?: string;
}



export interface CarsFilter {
  id_car_brand?: string,
  name?: string,
  production_year?: string
}

export function useGetCars(params?: CarsFilter) {
  return useQuery({
    queryKey: ["get-cars", params],
    queryFn: async () =>
      await callApi<CarModel[]>({
        url: "/car",
        method: "GET",
        params,
      }),
  });
}
