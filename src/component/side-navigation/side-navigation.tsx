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
import { useGetMe } from "../../api-hooks/user-api";
import { tokenDecode } from "../../utils/jwt";

const admin = [
  { link: `${NavigationRoutes.category}`, label: "Kategori", icon: Book },
  {
    link: `${NavigationRoutes.sparePart}`,
    label: "Barang",
    icon: BookOpenText,
  },
  { link: `${NavigationRoutes.purchase}`, label: "Pembelian", icon: Handshake },
  { link: `${NavigationRoutes.sales}`, label: "Penjualan", icon: HandCoins },
  {
    link: `${NavigationRoutes.stockAdjustment}`,
    label: "Penyesuaian Barang",
    icon: PencilSimpleLine,
  },
  { link: `${NavigationRoutes.supplier}`, label: "Supplier", icon: Storefront },
  { link: `${NavigationRoutes.user}`, label: "User", icon: UserList },
  { link: `${NavigationRoutes.car}`, label: "Mobil", icon: Car },
  { link: `${NavigationRoutes.brand}`, label: "Merk", icon: Garage },
];

const employee = [
  {
    link: `${NavigationRoutes.sparePart}`,
    label: "Barang",
    icon: BookOpenText,
  },
  { link: `${NavigationRoutes.purchase}`, label: "Pembelian", icon: Handshake },
  { link: `${NavigationRoutes.sales}`, label: "Penjualan", icon: HandCoins },
];

export default function SideNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useRouter();
  const { token, handleLogout } = useToken();
  const user = tokenDecode(token);

  const adminLink = admin.map((item) => (
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

  const employeeLink = employee.map((item) => (
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
          {user &&
            (user.id_role == 1
              ? adminLink
              : user.id_role == 3
              ? employeeLink
              : null)}
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
