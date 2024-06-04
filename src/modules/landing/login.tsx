"use client";
import { Button, Card, Center, Flex, Paper, Space } from "@mantine/core";
import React from "react";
import { useToken } from "../../hooks/use-token";
import { useRouter } from "next/router";
import { NavigationRoutes } from "../../common/constants/route";
import notification from "../../component/notification";
import { tokenDecode } from "../../utils/jwt";
import { LoginFormSchema, LoginFormType } from "./component/type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../../api-hooks/user-api";
import Input from "../../component/input";
import Form from "../../component/form";
import Image from "next/image";

export default function LoginPage() {
  const [isLoading, setLoading] = React.useState(false);
  const { handleToken } = useToken();
  const { replace, push } = useRouter();
  const { mutateAsync } = useLogin();
  const defaultValues: LoginFormType = {
    username: "",
    password: "",
  };
  const methods = useForm({
    resolver: yupResolver(LoginFormSchema()),
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: LoginFormType) => {
      try {
        setLoading(true);
        const result = await mutateAsync(values);
        handleToken(result.token);
        const user = tokenDecode(result.token);
        if (user?.id_role == 1) {
          replace(`${NavigationRoutes.adminHome}`);
        } else {
          replace(`${NavigationRoutes.userHome}`);
        }
      } catch (e: any) {
        e.message &&
          notification.error({
            title: e.error,
            message: e.message,
          });
      } finally {
        setLoading(false);
      }
    },
    [handleToken, mutateAsync, replace]
  );

  return (
    <Flex justify={"center"} direction={"column"} mih={"100vh"} gap={"lg"}>
      <Paper miw={320} maw={768} w="100%" p={16} m="auto">
        <Center>
          <Image width={256} height={150} src={"/logo.svg"} alt="logo" />
        </Center>
        <Card withBorder radius={"md"}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Flex direction={"column"} gap={"sm"}>
              <Input
                name="username"
                type="text"
                label="Username"
                required
                placeholder="Username"
              />
              <Input
                type="password"
                label="Password"
                required
                placeholder="Password"
                name="password"
              />
              <Flex justify={"flex-end"}>
                <Button
                  variant="transparent"
                  size="compact-sm"
                  onClick={() => push(`${NavigationRoutes.forgetPassword}`)}
                >
                  Lupa Password
                </Button>
              </Flex>
              <Center>
                <Button
                  size="md"
                  type="submit"
                  loading={isLoading}
                  w={120}
                  bg={"#FB7800"}
                >
                  Masuk
                </Button>
              </Center>
            </Flex>
          </Form>
          <Space h={"sm"} />
        </Card>
        <Space h={"lg"} />
        <hr />
        <Space h={"lg"} />
        <Center>
          <Button
            m="auto"
            size="md"
            variant="outline"
            onClick={() => push(`${NavigationRoutes.register}`)}
          >
            Daftar
          </Button>
        </Center>
      </Paper>
    </Flex>
  );
}
