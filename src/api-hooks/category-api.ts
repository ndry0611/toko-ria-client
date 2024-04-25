import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import { CategoryModel } from "../modules/admin/category/component/type";

export function useGetCategories() : UseQueryResult<CategoryModel[]> {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: async () =>
      await callApi<CategoryModel[]>({
        url: "/category",
        method: "GET",
      }),
  });
}
