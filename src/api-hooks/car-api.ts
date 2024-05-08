import { useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";
import { CarModel, CarsFilter } from "../modules/admin/car/component/type";

export function useGetCars(params?: CarsFilter) {
  return useQuery({
    queryKey: ["get-cars", params],
    queryFn: async () =>
      await callApi<CarModel[]>({
        url: "/car",
        method: "GET",
        params,
      }),
  });
}
