import { Button, ButtonProps } from "@mantine/core";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

interface FindButtonProps extends ButtonProps {}

export default function FindButton(props: FindButtonProps) {
  return (
    <Button {...props} leftSection={<MagnifyingGlass size={16} />} type="submit" variant="outline">
      Cari
    </Button>
  );
}
