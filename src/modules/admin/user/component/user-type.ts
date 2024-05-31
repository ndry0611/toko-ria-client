import * as Yup from "yup";

export interface UserModel {
  id: number;
  id_role: number;
  username: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  status: boolean;
  file_name?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface GetUserModel extends Omit<UserModel, "password"> {}

export interface UserFilter {
  name?: string;
  id_role?: string;
  status?: boolean;
}

export const UpdateUserFormSchema = () =>
  Yup.object({
    name: Yup.string().optional(),
    phone: Yup.string().optional(),
    address: Yup.string().optional(),
    status: Yup.boolean().optional(),
  });

export const CreateUserFormSchema = () =>
  Yup.object({
    id_role: Yup.string().optional(),
    name: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
  });

export type UpdateUserFormType = Yup.InferType<
  ReturnType<typeof UpdateUserFormSchema>
> & {
  data?: GetUserModel;
};

export type CreateUserFormType = Yup.InferType<
  ReturnType<typeof CreateUserFormSchema>
> & {
  data?: GetUserModel;
};
