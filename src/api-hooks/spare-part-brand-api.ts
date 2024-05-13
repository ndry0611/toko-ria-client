import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import {
  SparePartBrandFormType,
  SparePartBrandModel,
} from "../modules/admin/brand/component/spare-part-brand/spare-part-brand-type";

export function useGetSparePartBrands() {
  return useQuery({
    queryKey: ["get-spare-part-brands"],
    queryFn: async () =>
      await callApi<SparePartBrandModel[]>({
        url: "/spare-part-brand",
        method: "GET",
      }),
  });
}

export function useDeleteSparePartBrand() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        url: "/spare-part-brand/" + id,
        method: "DELETE",
      });
    },
  });
}

export function useCreateSparePartBrand() {
  return useMutation({
    mutationFn: async (request: SparePartBrandFormType) => {
      return await callApi({
        url: "/spare-part-brand",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useUpdateSparePartBrand() {
  return useMutation({
    mutationFn: async (request: { id: string; body: SparePartBrandFormType }) => {
      return await callApi({
        url: "/spare-part-brand/" + request.id,
        method: "PUT",
        data: request.body,
      });
    },
  });
}
