import { useMutation, useQuery } from "@tanstack/react-query";
import {
  SupplierFilter,
  SupplierFormType,
  SupplierModel,
} from "../modules/admin/supplier/component/type";
import { callApi } from "../utils/api";

export function useGetSuppliers(params?: SupplierFilter) {
  return useQuery({
    queryKey: ["get-suppliers", params],
    queryFn: async () =>
      await callApi<SupplierModel[]>({
        url: "/supplier",
        method: "GET",
        params,
      }),
  });
}

export function useCreateSupplier() {
  return useMutation({
    mutationFn: async (request: SupplierFormType) => {
      return await callApi({
        url: "/supplier",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useUpdateSupplier() {
  return useMutation({
    mutationFn: async (request: { id: string; body: SupplierFormType }) => {
      return await callApi({
        url: "/supplier/" + request.id,
        method: "PUT",
        data: request.body,
      });
    },
  });
}

export function useDeleteSupplier() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        url: "/supplier/" + id,
        method: "DELETE",
      });
    },
  });
}
