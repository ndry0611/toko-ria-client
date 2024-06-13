import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export const ComplaintFormSchema = () =>
  Yup.object({
    complaint: Yup.string().required("Komplain tidak boleh kosong!"),
  });
export type ComplaintFormType = Yup.InferType<
  ReturnType<typeof ComplaintFormSchema>
>;

export function useCreateComplaint() {
  return useMutation({
    mutationFn: async (request: ComplaintFormType) => {
      return await callApi({
        url: "/complaint",
        method: "POST",
        data: request,
      });
    },
  });
}
