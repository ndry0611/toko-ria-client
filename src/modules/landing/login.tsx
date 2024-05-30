"use client";
import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Image,
  Space,
  Text,
} from "@mantine/core";
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
import Link from "next/link";
import { color } from "../../common/constants/color";

export default function LoginPage() {
  const [isLoading, setLoading] = React.useState(false);
  const { handleToken } = useToken();
  const { replace } = useRouter();
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
        if (user.id_role == 1) {
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
      <Center>
        <Image src={"/logo.svg"} miw={180} alt="logo" />
      </Center>
      <Grid>
        <Grid.Col span={3} />
        <Grid.Col span={6}>
          <Card withBorder radius={"md"} shadow="md">
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
          <Container style={{ borderTop: "1px solid" }} pt={16}>
            <Link style={{textDecoration: "none"}} href={`${NavigationRoutes.register}`}>
              <Text ta={"center"} fz={20} c={color.mainTheme}>Daftar</Text>
            </Link>
          </Container>
        </Grid.Col>
        <Grid.Col span={3} />
      </Grid>
    </Flex>
  );
}
