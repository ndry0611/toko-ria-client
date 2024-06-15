import { Button, Flex, Text } from "@mantine/core";
import PhoneLayout from "../../component/phone-layout/phone-layout";
import Logo from "../../component/logo";
import React from "react";
import Form from "../../component/form";
import { useForgetPassword } from "../../api-hooks/user-api";
import { useRouter } from "next/router";
import {
  ForgetPasswordFormSchema,
  ForgetPasswordFormType,
} from "./component/type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import notification from "../../component/notification";
import { NavigationRoutes } from "../../common/constants/route";
import Input from "../../component/input";

export default function ForgetPasswordPage() {
  return (
    <PhoneLayout
      back
      centerComponent={
        <Text ta={"center"} fw={700} w={"100%"}>
          Lupa Password
        </Text>
      }
    >
      <Logo m="auto" />
      <ForgetPasswordForm />
    </PhoneLayout>
  );
}

function ForgetPasswordForm() {
  const [isLoading, setLoading] = React.useState(false);
  const { mutateAsync } = useForgetPassword();
  const { push } = useRouter();
  const defaultValues = React.useMemo<ForgetPasswordFormType>(() => {
    return {
      username: "",
      name: "",
      phone: "",
      password: "",
      cPass: "",
    };
  }, []);

  const methods = useForm({
    resolver: yupResolver(ForgetPasswordFormSchema()),
    defaultValues,
  });
  const onSubmit = React.useCallback(
    async (values: ForgetPasswordFormType) => {
      try {
        setLoading(true);
        await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Ganti Password Berhasil",
        });
        push(`${NavigationRoutes.login}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      } finally {
        setLoading(false);
      }
    },
    [mutateAsync, push]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Flex direction={"column"} gap={"lg"}>
        <Input type="text" name="username" label="Username" description="Silahkan datang ke toko apabila lupa username!" />
        <Input type="text" name="name" label="Nama" />
        <Input type="text" name="phone" label="Nomor Handphone" />
        <Input type="password" name="password" label="Password Baru" />
        <Input type="password" name="cPass" label="Konfirmasi Password Baru" />
        <Button loading={isLoading} type="submit">
          Ganti Password
        </Button>
      </Flex>
    </Form>
  );
}
