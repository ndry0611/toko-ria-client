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

function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { handleToken } = useToken();
  const { push } = useRouter();

  const loginHandler = async () => {
    try {
      const result = await callApi({
        url: "/user/login",
        method: "POST",
        data: { username, password },
      });
      handleToken(result.token);
      push(`${NavigationRoutes.home}`);
    } catch (error: any) {
      console.log(error);
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
                <Button size="md" w={120} bg={"#FB7800"} onClick={loginHandler}>
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
