"use client";

import { MantineColorsTuple, createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

const myColor: MantineColorsTuple = [
  '#fff1e1',
  '#ffe2cb',
  '#ffc49a',
  '#ff852d',
  '#ff8a36',
  '#ff7918',
  '#ff7006',
  '#e45e00',
  '#cb5200',
  '#b14500'
];

export const theme = createTheme({
  colors:{myColor},
  primaryColor: 'myColor'
});
export const vars = themeToVars(theme);
