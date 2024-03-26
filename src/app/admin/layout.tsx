import "@mantine/core/styles.css";
import React from "react";
import { Flex, MantineProvider } from "@mantine/core";
import { NavbarSimple } from "../../component/common/navigation";

export default function RootLayout({ children }: { children: any }) {
  return (
    <>
      <Flex>
        <NavbarSimple />
        <Flex w={"100%"} mah={"100vh"} style={{ overflow: "auto" }}>
          {children}
        </Flex>
      </Flex>
    </>
  );
}
