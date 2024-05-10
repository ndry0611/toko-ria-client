import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetUserModel,
  UserFilter,
} from "../modules/admin/user/component/user-type";
import { callApi } from "../utils/api";

export function useGetUsers(params?: UserFilter) {
  return useQuery({
    queryKey: ["get-users", params],
    queryFn: async () =>
      await callApi<GetUserModel[]>({
        url: "/user",
        method: "GET",
        params,
      }),
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        url: "/user/" + id,
        method: "DELETE",
      });
    },
  });
}
