import * as Yup from "yup";

export const LoginFormSchema = () =>
  Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

export const RegisterUserFormSchema = () =>
  Yup.object({
    id_role: Yup.string().optional(),
    name: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    cPass: Yup.string()
      .oneOf([Yup.ref("password")], "Pastikan password sama!")
      .required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
  });

export type LoginFormType = Yup.InferType<ReturnType<typeof LoginFormSchema>>;

export type RegisterUserFormType = Yup.InferType<
  ReturnType<typeof RegisterUserFormSchema>
>;
