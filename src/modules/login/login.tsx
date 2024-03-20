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

function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginHandler = () => {
    console.log(username, password);
  };
  return (
    <>
      <Flex
        bg={"#FB7800"}
        align={"center"}
        direction={"column"}
        justify={"center"}
        mih={"100vh"}
      >
        <Text c={"white"} fz={40} fw={700}>
          Welcome To
        </Text>
        <Center>
          <Image src={"/logo.svg"} w={180} alt="logo" />
        </Center>
        <Text c={"white"} fz={40} fw={700}>
          Login
        </Text>
        <Grid w="100%">
          <Grid.Col span={3} />
          <Grid.Col span={6}>
            <Card withBorder radius={"md"} shadow="md">
              <Flex direction={"column"} gap={"md"}>
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
                  <Button
                    size="md"
                    w={120}
                    onClick={loginHandler}
                    bg={"#FB7800"}
                  >
                    Login
                  </Button>
                </Center>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={3} />
        </Grid>
      </Flex>
    </>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}
