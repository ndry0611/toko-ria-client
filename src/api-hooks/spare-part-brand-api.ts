import { useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import { SparePartBrandModel } from "../modules/admin/spare-part-brand/component/type";

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