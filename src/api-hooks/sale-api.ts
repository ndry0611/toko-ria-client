import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import {
  GetSaleModel,
  GetSalesModel,
  SaleFormType,
  SalesFilter,
} from "../modules/admin/sales/components/type";

export function useGetSales(params?: SalesFilter) {
  return useQuery({
    queryKey: ["get-sales", params],
    queryFn: async () =>
      await callApi<GetSalesModel[]>({
        url: "/sale",
        method: "GET",
        params,
      }),
  });
}

export function useGetSale(id: string) {
  return useQuery({
    queryKey: ["get-sale", id],
    queryFn: async () =>
      await callApi<GetSaleModel>({
        url: "/sale/" + id,
        method: "GET",
      }),
    enabled: !!id,
  });
}

export function useCreateSale() {
  return useMutation({
    mutationFn: async (request: SaleFormType) => {
      return await callApi({
        url: "/sale/create",
        method: "POST",
        data: request,
      });
    },
  });
}
