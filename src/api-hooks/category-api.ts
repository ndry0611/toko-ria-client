import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import {
  CategoryFormType,
  CategoryModel,
} from "../modules/admin/category/component/type";

export function useGetCategories(): UseQueryResult<CategoryModel[]> {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: async () =>
      await callApi<CategoryModel[]>({
        url: "/category",
        method: "GET",
      }),
  });
}

export function useGetCategory(id: string) {
  return useQuery({
    queryKey: ["get-categories", id],
    queryFn: async () =>
      await callApi<CategoryModel>({
        url: "/category/" + id,
        method: "GET",
      }),
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: async (id: string) => {
      await callApi({
        url: "/category/" + id,
        method: "DELETE",
      });
    },
  });
}

export function useCreateCategory() {
  return useMutation({
    mutationFn: async (request: CategoryFormType) => {
      await callApi({
        url: "/category",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: async (request: { id: string; body: CategoryFormType }) => {
      await callApi({
        url: "/category/" + request.id,
        method: "PUT",
        data: request.body,
      });
    },
  });
}
