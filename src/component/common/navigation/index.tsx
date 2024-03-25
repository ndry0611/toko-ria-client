'use client'
import { useState } from "react";
import { Group, Code } from "@mantine/core";
import { Book, SignOut } from "@phosphor-icons/react";

import classes from "./NavbarSimple.module.css";

const data = [{ link: "", label: "Kategori", icon: Book }];

export function NavbarSimple() {
  const [active, setActive] = useState("Billing");

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
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>v3.1.2</Code>
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
