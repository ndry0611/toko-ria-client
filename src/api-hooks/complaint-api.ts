import { useQuery } from "@tanstack/react-query";
import {
  ComplaintFilter,
  GetComplaintsModel,
} from "../modules/admin/user/component/complaint-type";
import { callApi } from "../utils/api";

export function useGetComplaints(params?: ComplaintFilter) {
  return useQuery({
    queryKey: ["get-complaints", params],
    queryFn: async () =>
      await callApi<GetComplaintsModel[]>({
        url: "/complaint",
        method: "GET",
        params,
      }),
  });
}
