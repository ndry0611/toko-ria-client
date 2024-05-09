import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import {
  GetCarModel,
  CarsFilter,
  CarFormType,
} from "../modules/admin/car/component/type";

export function useGetCars(params?: CarsFilter) {
  return useQuery({
    queryKey: ["get-cars", params],
    queryFn: async () =>
      await callApi<GetCarModel[]>({
        url: "/car",
        method: "GET",
        params,
      }),
  });
}

export function useGetCar(id: string) {
  return useQuery({
    queryKey: ["get-car", id],
    queryFn: async () =>
      await callApi<GetCarModel>({
        url: "/car/" + id,
        method: "GET",
      }),
    enabled: !!id,
  });
}

export function useCreateCar() {
  return useMutation({
    mutationFn: async (request: CarFormType) => {
      return await callApi({
        url: "/car",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useUpdateCar() {
  return useMutation({
    mutationFn: async (request: { id: string; body: CarFormType }) => {
      return await callApi({
        url: "/car/" + request.id,
        method: "PUT",
        data: request.body,
      });
    },
  });
}

export function useDeleteCar() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        url: "/car/" + id,
        method: "DELETE",
      });
    },
  });
}
