import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { NavbarSimple } from "../../component/common/navigation";
import { Content } from "../../component/common/content";

export const metadata = {
  title: "Toko Ria Sigli",
  description: "Autoparts Shop",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <MantineProvider>
      <NavbarSimple />
      <Content>{children}</Content>
    </MantineProvider>
  );
}
