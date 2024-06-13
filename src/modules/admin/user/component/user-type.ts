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
    old_password: Yup.string().required("Password Lama tidak boleh kosong!"),
    new_password: Yup.string().required("Password Baru tidak boleh kosong!"),
    np_confirmation: Yup.string()
      .oneOf([Yup.ref("new_password")], "Pastikan password sama!")
      .required("Konfirmasi password tidak boleh kosong!"),
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
    name: Yup.string().required("Nama Pelanggan tidak boleh kosong!"),
    username: Yup.string().required("Username tidak boleh kosong!").matches(/^\S+$/, "Username tidak boleh menggunakan spasi!"),
    password: Yup.string().required("Password tidak boleh kosong!"),
    phone: Yup.string().required("Nomor telepon tidak boleh kosong!"),
    address: Yup.string().required("Alamat tidak boleh kosong!"),
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
