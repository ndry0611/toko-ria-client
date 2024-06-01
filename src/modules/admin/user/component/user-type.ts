import * as Yup from "yup";

export interface UserModel {
  id: number;
  id_role: number;
  username: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  file_name?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface GetUserModel extends Omit<UserModel, "password"> {}

export interface UserFilter {
  name?: string;
  id_role?: string;
  status?: "ACTIVE" | "INACTIVE";
  daftar?: "aktif" | "pending";
}

export const ChangePasswordFormSchema = () =>
  Yup.object({
    old_password: Yup.string().required(),
    new_password: Yup.string().required(),
    np_confirmation: Yup.string()
      .oneOf([Yup.ref("new_password")], "Pastikan password sama!")
      .required(),
  });

export const UpdateUserFormSchema = () =>
  Yup.object({
    name: Yup.string().optional(),
    phone: Yup.string().optional(),
    address: Yup.string().optional(),
    status: Yup.string()
      .oneOf(["ACTIVE", "PENDING", "INACTIVE", undefined])
      .optional(),
  });

export const CreateUserFormSchema = () =>
  Yup.object({
    id_role: Yup.string().optional(),
    name: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
    status: Yup.string()
      .oneOf(["ACTIVE", "PENDING", "INACTIVE", undefined])
      .optional(),
  });

export type UpdateUserFormType = Yup.InferType<
  ReturnType<typeof UpdateUserFormSchema>
> & {
  data?: GetUserModel;
};

export type ChangePasswordFormType = Yup.InferType<
  ReturnType<typeof ChangePasswordFormSchema>
>;

export type CreateUserFormType = Yup.InferType<
  ReturnType<typeof CreateUserFormSchema>
> & {
  data?: GetUserModel;
};
