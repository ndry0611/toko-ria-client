import { Text, TextProps } from "@mantine/core";
import React from "react";

export default function TitleText({ children }: { children: React.ReactNode }) {
  return (
    <Text fz={26} fw={500}>
      {children}
    </Text>
  );
}
