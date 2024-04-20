import React from "react";
import { Button, Container, Flex, Group, Image } from "@mantine/core";
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

const data = [
  { link: `${NavigationRoutes.category}`, label: "Kategori", icon: Book },
  { link: `${NavigationRoutes.sparePart}`, label: "Barang", icon: BookOpenText },
  { link: "", label: "Pembelian", icon: Handshake },
  { link: "", label: "Penjualan", icon: HandCoins },
  { link: "", label: "Penyesuaian Barang", icon: PencilSimpleLine },
  { link: "", label: "Supplier", icon: Storefront },
  { link: "", label: "Pelanggan", icon: UserList },
  { link: "", label: "Mobil", icon: Car },
  { link: "", label: "Merk", icon: Garage },
];

export default function SideNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = React.useState("");
  const { handleLogout } = useToken();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
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
          >
            <SignOut className={classes.linkIcon} />
            <span>Log out</span>
          </Button>
        </div>
      </nav>
      <Container w={"100%"} style={{ overflow: "auto" }} p={16}>
        {children}
      </Container>
    </Flex>
  );
}
