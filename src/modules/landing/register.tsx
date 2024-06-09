import { Button, Card, Center, Flex, Image, Text } from "@mantine/core";
import PhoneLayout from "../../component/phone-layout/phone-layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterUserFormSchema, RegisterUserFormType } from "./component/type";
import { useRegisterUser } from "../../api-hooks/user-api";
import Form from "../../component/form";
import Input from "../../component/input";
import { NavigationRoutes } from "../../common/constants/route";
import notification from "../../component/notification";
import { useRouter } from "next/router";
import { Info } from "@phosphor-icons/react";
import { color } from "../../common/constants/color";
import Logo from "../../component/logo";
import React from "react";

export default function RegisterPage() {
  const centerComponent = (
    <Text ta={"center"} fw={700} w="100%">
      Registrasi
    </Text>
  );
  return (
    <PhoneLayout back centerComponent={centerComponent}>
      <Logo m="auto" />
      <RegisterForm />
    </PhoneLayout>
  );
}

function RegisterForm() {
  const [isLoading, setLoading] = React.useState(false);
  const { mutateAsync } = useRegisterUser();
  const { push } = useRouter();
  const defaultValues = React.useMemo<RegisterUserFormType>(() => {
    return {
      username: "",
      password: "",
      cPass: "",
      name: "",
      phone: "",
      address: "",
    };
  }, []);

  const methods = useForm({
    resolver: yupResolver(RegisterUserFormSchema()),
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: RegisterUserFormType) => {
      try {
        setLoading(true);
        const user = await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Registrasi Berhasil",
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
        <Input type="text" name="username" label="Username" />
        <Input type="password" name="password" label="Password" />
        <Input type="password" name="cPass" label="Konfirmasi Password" />
        <Input type="text" name="name" label="Nama" />
        <Input type="text" name="phone" label="Nomor Handphone" />
        <Input type="text-area" name="address" label="Alamat" />
        <Card withBorder bg={color.information1}>
          <Flex direction={"row"} gap={"md"}>
            <Info weight="bold" size={24} />
            <Text fw={"bold"}>Informasi!</Text>
          </Flex>
          <Text>
            Akun terlebih dahulu diverifikasi oleh pihak toko sebelum dapat
            digunakan, Mohon ditunggu. Terima kasih
          </Text>
        </Card>
        <Button loading={isLoading} type="submit" my={"md"}>
          Daftar
        </Button>
      </Flex>
    </Form>
  );
}
