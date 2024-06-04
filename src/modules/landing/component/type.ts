import * as Yup from "yup";

export const LoginFormSchema = () =>
  Yup.object({
    username: Yup.string().required().matches(/^\S+$/, "Username tidak boleh menggunakan spasi!"),
    password: Yup.string().required(),
  });

export const RegisterUserFormSchema = () =>
  Yup.object({
    id_role: Yup.string().optional(),
    name: Yup.string().required(),
    username: Yup.string().required().matches(/^\S+$/, "Username tidak boleh menggunakan spasi!"),
    password: Yup.string().required(),
    cPass: Yup.string()
      .oneOf([Yup.ref("password")], "Pastikan password sama!")
      .required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
  });

export const ForgetPasswordFormSchema = () =>
  Yup.object({
    username: Yup.string().required().matches(/^\S+$/, "Username tidak boleh menggunakan spasi!"),
    name: Yup.string().required(),
    phone: Yup.string().required(),
    password: Yup.string().required(),
    cPass: Yup.string()
      .oneOf([Yup.ref("password")], "Pastikan password sama!")
      .required(),
  });

export type LoginFormType = Yup.InferType<ReturnType<typeof LoginFormSchema>>;

export type RegisterUserFormType = Yup.InferType<
  ReturnType<typeof RegisterUserFormSchema>
>;

export type ForgetPasswordFormType = Yup.InferType<
  ReturnType<typeof ForgetPasswordFormSchema>
>;
