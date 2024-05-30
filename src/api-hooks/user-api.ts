import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateUserFormType,
  GetUserModel,
  UpdateUserFormType,
  UserFilter,
} from "../modules/admin/user/component/user-type";
import { callApi } from "../utils/api";
import {
  LoginFormType,
  RegisterUserFormType,
} from "../modules/landing/component/type";

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

export function useCreateUser() {
  return useMutation({
    mutationFn: async (request: CreateUserFormType) => {
      return await callApi({
        url: "/user",
        method: "POST",
        data: request,
      });
    },
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

export function useUpdateUser() {
  return useMutation({
    mutationFn: async (request: { id: string; body: UpdateUserFormType }) => {
      return await callApi({
        url: "/user/" + request.id,
        method: "PUT",
        data: request.body,
      });
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (request: LoginFormType) => {
      return await callApi({
        url: "/user/login",
        method: "POST",
        data: request,
      });
    },
  });
}

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (request: RegisterUserFormType) => {
      return await callApi({
        url: "/user/register",
        method: "POST",
        data: request,
      });
    },
  });
}
