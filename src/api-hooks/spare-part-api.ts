import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import {
  GetSparePartModel,
  SparePartFormType,
} from "../modules/admin/spare-part/component/type";

export function useGetSpareParts(params?: any) {
  return useQuery({
    queryKey: ["get-spare-parts", params],
    queryFn: async () =>
      await callApi<GetSparePartModel[]>({
        url: "/spare-part",
        method: "GET",
        params,
      }),
  });
}

export function useGetSparePart(id: string) {
  return useQuery({
    queryKey: ["get-spare-part", id],
    queryFn: async () =>
      await callApi<GetSparePartModel>({
        url: "/spare-part/" + id,
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
        data: request,
      });
    },
  });
}

export function useUpdateSparePart() {
  return useMutation({
    mutationFn: async (request:  {id: string; body: SparePartFormType }) => {
      return await callApi({
        url: "/spare-part/" + request.id,
        method: "PUT",
        data: request.body,
      });
    },
  });
}

export function useDeleteSparePart() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        url: "/spare-part/" + id,
        method: "DELETE",
      });
    },
  });
}