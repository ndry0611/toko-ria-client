import { useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import { CarBrandModel } from "../modules/admin/brand/component/car-brand-type";

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
