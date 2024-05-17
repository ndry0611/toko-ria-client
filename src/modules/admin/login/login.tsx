"use client";
import {
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Image,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useToken } from "../../../hooks/use-token";
import { callApi } from "../../../utils/api";
import { useRouter } from "next/router";
import { NavigationRoutes } from "../../../common/constants/route";
import notification from "../../../component/notification";

function LoginForm() {
  const [isLoading, setLoading] = React.useState(false)
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { handleToken } = useToken();
  const { replace } = useRouter();

  const loginHandler = async () => {
    try {
      setLoading(true)
      const result = await callApi({
        url: "/user/login",
        method: "POST",
        data: { username, password },
      });
      handleToken(result.token);
      replace(`${NavigationRoutes.home}`);
    } catch (e: any) {
      e.message &&
      notification.error({
        title: e.error,
        message: e.message,
      });
    }finally{ 
      setLoading(false)
    }
  };

  return (
    <Flex bg={"#FB7800"} justify={"center"} direction={"column"} mih={"100vh"}>
      <Text c={"white"} fz={40} fw={700} ta={"center"}>
        Welcome To
      </Text>
      <Center>
        <Image src={"/logo.svg"} w={180} alt="logo" />
      </Center>
      <Text c={"white"} fz={40} fw={700} ta={"center"}>
        Login
      </Text>
      <Grid>
        <Grid.Col span={3} />
        <Grid.Col span={6}>
          <Card withBorder radius={"md"} shadow="md">
            <Flex direction={"column"} gap={"sm"}>
              <TextInput
                label="Username"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <PasswordInput
                label="Password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Center>
                <Button size="md" loading={isLoading} w={120} bg={"#FB7800"} onClick={loginHandler}>
                  Login
                </Button>
              </Center>
            </Flex>
          </Card>
        </Grid.Col>
        <Grid.Col span={3} />
      </Grid>
    </Flex>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}
