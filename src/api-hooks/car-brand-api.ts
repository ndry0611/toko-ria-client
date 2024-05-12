import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import {
  CarBrandFormType,
  CarBrandModel,
} from "../modules/admin/brand/component/car-brand/car-brand-type";

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

export function useCreateCarBrand() {
  return useMutation({
    mutationFn: async (request: CarBrandFormType) => {
      return await callApi({
        url: "/car-brand",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useUpdateCarBrand() {
  return useMutation({
    mutationFn: async (request: { id: string; body: CarBrandFormType }) => {
      return await callApi({
        url: "/car-brand/" + request.id,
        method: "PUT",
        data: request.body,
      });
    },
  });
}
