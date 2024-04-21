import { useQuery } from "react-query";
import { callApi } from "../utils/api";
import { CategoryType } from "../modules/admin/category/component/type";

export function useGetCategories() {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => await callApi<CategoryType[]>({
      url: "/category",
      method: "GET"
    }),
  });
}
