import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import { GetStockAdjustmentModel, StockAdjustmentFilter, StockAdjustmentFormType } from "../modules/admin/stock-adjustment/component/type";

export function useGetStockAdjustments(params?: StockAdjustmentFilter) {
  return useQuery({
    queryKey: ["get-stock-adjustments", params],
    queryFn: async () =>
      await callApi<GetStockAdjustmentModel[]>({
        url: "/stock-adjustment",
        method: "GET",
        params,
      }),
  });
}

export function useCreateStockAdjustment() {
  return useMutation({
    mutationFn: async (request: StockAdjustmentFormType) => {
      return await callApi({
        url: "/stock-adjustment",
        method: "POST",
        data: request,
      });
    },
  });
}