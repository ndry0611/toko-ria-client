import { useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";

// Will moved to car-brand/component/type.ts
export interface CarBrandModel {
  id: number;
  name: string;
  manufacture: string;
  created_at?: string;
  updated_at?: string;
}

export function useGetCarBrands() {
  return useQuery({
    queryKey: ["get-car-brands"],
    queryFn: async () =>
      await callApi<CarBrandModel[]>({
        url: "/car-brand",
        method: "GET",
      }),
  });
}
