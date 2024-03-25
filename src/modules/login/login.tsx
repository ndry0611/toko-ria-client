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
import React, { useEffect } from "react";
import { useToken } from "../../hooks/use-token";

function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const loginHandler = async () => {
    //Call API
    try {
      const result = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (result.ok) {
        const data = await result.json();
        console.log(data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
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
                {error && (
                  <Text c={"red"} fz={14} fw={500}>
                    Invalid Username or Password
                  </Text>
                )}
                <Center>
                  <Button
                    size="md"
                    w={120}
                    bg={"#FB7800"}
                    onClick={loginHandler}
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
