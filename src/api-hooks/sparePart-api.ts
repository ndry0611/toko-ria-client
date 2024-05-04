import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import { GetSparePartModel, SparePartFormType } from "../modules/admin/spare-part/component/type";

export function useGetSpareParts() {
  return useQuery({
    queryKey: ["get-spare-parts"],
    queryFn: async () => await callApi<GetSparePartModel[]>({
      url: "/spare-part",
      method: "GET",
    }),
  });
}

export function useCreateSparePart() {
  return useMutation({
    mutationFn: async (request: SparePartFormType) => {
      return await callApi({
        url: "/spare-part",
        method: "POST",
        data: request
      });
    },
  });
}