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
  created_at?: string;
  updated_at?: string;
}

export interface GetUserModel extends Omit<UserModel, "password">{}

export interface UserFilter {
  name?: string;
  status?: boolean;
}

export const UserFormSchema = () =>
  Yup.object({
    id_role: Yup.number().optional(),
    name: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
  });

export type UserFormType = Yup.InferType<ReturnType<typeof UserFormSchema>> & {
  data?: GetUserModel;
};
