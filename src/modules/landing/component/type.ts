import * as Yup from "yup";

export const LoginFormSchema = () =>
  Yup.object({
    username: Yup.string().required("Username tidak boleh kosong!").matches(/^\S+$/, "Username tidak boleh menggunakan spasi!"),
    password: Yup.string().required("Password tidak boleh kosong!"),
  });

export const RegisterUserFormSchema = () =>
  Yup.object({
    id_role: Yup.string().optional(),
    name: Yup.string().required("Nama tidak boleh kosong!"),
    username: Yup.string().required("Username tidak boleh kosong!").matches(/^\S+$/, "Username tidak boleh menggunakan spasi!"),
    password: Yup.string().required("Password tidak boleh kosong!"),
    cPass: Yup.string()
      .oneOf([Yup.ref("password")], "Pastikan password sama!")
      .required("Konfirmasi Password tidak boleh kosong!"),
    phone: Yup.string().required("Nomor telepon tidak boleh kosong!"),
    address: Yup.string().required("Alamat tidak boleh kosong!"),
  });

export const ForgetPasswordFormSchema = () =>
  Yup.object({
    username: Yup.string().required("Username tidak boleh kosong!").matches(/^\S+$/, "Username tidak boleh menggunakan spasi!"),
    name: Yup.string().required("Nama tidak boleh kosong!"),
    phone: Yup.string().required("Nomor telepon tidak boleh kosong!"),
    password: Yup.string().required("Password Baru tidak boleh kosong!"),
    cPass: Yup.string()
      .oneOf([Yup.ref("password")], "Pastikan password sama!")
      .required("Konfirmasi Password Baru tidak boleh kosong!"),
  });

export type LoginFormType = Yup.InferType<ReturnType<typeof LoginFormSchema>>;

export type RegisterUserFormType = Yup.InferType<
  ReturnType<typeof RegisterUserFormSchema>
>;

export type ForgetPasswordFormType = Yup.InferType<
  ReturnType<typeof ForgetPasswordFormSchema>
>;
