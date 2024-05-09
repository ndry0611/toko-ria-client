import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import { GetCarModel, CarsFilter } from "../modules/admin/car/component/type";

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
