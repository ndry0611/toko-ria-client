import React from "react";
import { Button, Container, Flex, Group, Image, Text } from "@mantine/core";
import {
  Book,
  BookOpenText,
  SignOut,
  Garage,
  PencilSimpleLine,
  HandCoins,
  Handshake,
  UserList,
  Car,
  Storefront,
} from "@phosphor-icons/react";

import classes from "./NavbarSimple.module.css";
import { useToken } from "../../hooks/use-token";
import { NavigationRoutes } from "../../common/constants/route";
import Link from "next/link";
import { useRouter } from "next/router";

const data = [
  { link: `${NavigationRoutes.category}`, label: "Kategori", icon: Book },
  {
    link: `${NavigationRoutes.sparePart}`,
    label: "Barang",
    icon: BookOpenText,
  },
  { link: "", label: "Pembelian", icon: Handshake },
  { link: "", label: "Penjualan", icon: HandCoins },
  {
    link: `${NavigationRoutes.stockAdjustment}`,
    label: "Penyesuaian Barang",
    icon: PencilSimpleLine,
  },
  { link: "", label: "Supplier", icon: Storefront },
  { link: `${NavigationRoutes.user}`, label: "Pelanggan", icon: UserList },
  { link: `${NavigationRoutes.car}`, label: "Mobil", icon: Car },
  { link: `${NavigationRoutes.brand}`, label: "Merk", icon: Garage },
];

export default function SideNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useRouter();
  const { handleLogout } = useToken();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === pathname || undefined}
      href={item.link}
      key={item.link}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Flex mih={"100dvh"}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="center">
            <Link href="/admin">
              <Image alt="logo" src={"/logo.svg"} />
            </Link>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <Button
            className={classes.link}
            onClick={handleLogout}
            variant="transparent"
            leftSection={<SignOut className={classes.linkIcon} />}
          >
            <span className={classes.logoutText}>Log out</span>
          </Button>
        </div>
      </nav>
      <Container
        mah="100vh"
        miw="calc(100vw - 300px)"
        maw="calc(100vw - 300px)"
        style={{ overflow: "auto", position: "relative" }}
        p={16}
      >
        {children}
      </Container>
    </Flex>
  );
}
