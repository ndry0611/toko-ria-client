import { useMutation } from "@tanstack/react-query";
import { AddCartDetailFormType } from "../modules/user/cart/component/type";
import { callApi } from "../utils/api";

export function useAddCartDetail() {
  return useMutation({
    mutationFn: async (request: AddCartDetailFormType) => {
      return await callApi({
        url: "/cart/details",
        method: "POST",
        data: request
      })
    }
  })
}