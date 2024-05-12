import { useMutation, useQuery } from "@tanstack/react-query";
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

export function useDeleteCarBrand() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        url: "/car-brand/" + id,
        method: "DELETE",
      });
    },
  });
}
