import { useQuery } from "@tanstack/react-query";
import { callApi } from "../utils/api";

// Will moved to spare-part-brand/component/type.ts
export interface SparePartBrandModel {
  id: number;
  name: string;
  manufacture: string;
  created_at?: string;
  updated_at?: string;
}

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
