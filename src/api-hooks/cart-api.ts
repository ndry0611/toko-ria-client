import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddCartDetailFormType,
  CartModel,
} from "../modules/user/cart/component/type";
import { callApi } from "../utils/api";
import { SaleModel } from "../modules/admin/sales/components/type";

export function useGetCart() {
  return useQuery({
    queryKey: ["get-cart"],
    queryFn: async () =>
      await callApi<CartModel>({
        url: "/cart",
        method: "GET",
      }),
  });
}

export function useAddCartDetail() {
  return useMutation({
    mutationFn: async (request: AddCartDetailFormType) => {
      return await callApi({
        url: "/cart/details",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useCartCheckout() {
  return useMutation({
    mutationFn: async () => {
      return await callApi<SaleModel>({
        url: "/cart/checkout",
        method: "POST",
      });
    },
  });
}

export function useDeleteCartDetail() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        url: "/cart/details/" + id,
        method: "DELETE",
      });
    },
  });
}
