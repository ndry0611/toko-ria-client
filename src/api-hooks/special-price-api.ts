import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import {
  GetSpecialPriceModel,
  MultipleSpecialPriceFormType,
  SpecialPriceFilter,
  SpecialPriceFormType,
} from "../modules/admin/special-price/component/type";

export function useGetSpecialPrices(params?: SpecialPriceFilter) {
  return useQuery({
    queryKey: ["get-special-price", params],
    queryFn: async () =>
      await callApi<GetSpecialPriceModel[]>({
        url: "/special-price/",
        method: "GET",
        params,
      }),
  });
}

export function useGetSpecialPricesByIdSparePart(id: string) {
  return useQuery({
    queryKey: ["get-special-price", id],
    queryFn: async () =>
      await callApi<GetSpecialPriceModel[]>({
        url: "/special-price/" + id,
        method: "GET",
      }),
    enabled: !!id,
  });
}

export function useCreateSpecialPrice() {
  return useMutation({
    mutationFn: async (request: SpecialPriceFormType) => {
      return await callApi({
        url: "/special-price",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useCreateMultipleSpecialPrice() {
  return useMutation({
    mutationFn: async (request: MultipleSpecialPriceFormType) => {
      return await callApi({
        url: "/special-price/multiple",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useDeleteSpecialPrice() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        url: "/special-price/" + id,
        method: "DELETE",
      });
    },
  });
}
