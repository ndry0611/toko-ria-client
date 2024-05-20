import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import {
  GetPurchaseModel,
  GetPurchasesModel,
  PurchaseFilter,
  PurchaseFormType,
  UpdatePurchaseFormType,
} from "../modules/admin/purchase/component/type";

export function useGetPurchases(params?: PurchaseFilter) {
  return useQuery({
    queryKey: ["get-purchases", params],
    queryFn: async () =>
      await callApi<GetPurchasesModel[]>({
        url: "/purchase",
        method: "GET",
        params,
      }),
  });
}

export function useGetPurchase(id: string) {
  return useQuery({
    queryKey: ["get-purchase", id],
    queryFn: async () =>
      await callApi<GetPurchaseModel>({
        url: "/purchase/" + id,
        method: "GET",
      }),
    enabled: !!id,
  });
}

export function useCreatePurchase() {
  return useMutation({
    mutationFn: async (request: PurchaseFormType) => {
      return await callApi({
        url: "/purchase",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useUpdatePurchase() {
  return useMutation({
    mutationFn: async (request: {
      id: string;
      body: UpdatePurchaseFormType;
    }) => {
      return await callApi({
        url: "/purchase/" + request.id,
        method: "PUT",
        data: request.body,
      });
    },
  });
}
