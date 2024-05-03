import { useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import { GetSparePartModel } from "../modules/admin/spare-part/component/type";

export function useGetSpareParts() {
  return useQuery({
    queryKey: ["get-spare-parts"],
    queryFn: async () => await callApi<GetSparePartModel[]>({
      url: "/spare-part",
      method: "GET",
    }),
  });
}
