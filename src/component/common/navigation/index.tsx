"use client";
import { useState } from "react";
import { Anchor, Group, Image } from "@mantine/core";
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

const data = [
  { link: "", label: "Kategori", icon: Book },
  { link: "", label: "Barang", icon: BookOpenText },
  { link: "", label: "Pembelian", icon: Handshake },
  { link: "", label: "Penjualan", icon: HandCoins },
  { link: "", label: "Penyesuaian Barang", icon: PencilSimpleLine },
  { link: "", label: "Supplier", icon: Storefront },
  { link: "", label: "Pelanggan", icon: UserList },
  { link: "", label: "Mobil", icon: Car },
  { link: "", label: "Merk", icon: Garage },
];

export function NavbarSimple() {
  const [active, setActive] = useState("");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="center">
          <Anchor href="#">
            <Image alt="logo" src={"/logo.svg"} />
          </Anchor>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <SignOut className={classes.linkIcon} />
          <span>Log out</span>
        </a>
      </div>
    </nav>
  );
}
