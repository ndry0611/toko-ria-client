import { Button, ButtonProps } from "@mantine/core";
import React from "react";

interface FindButtonProps extends ButtonProps {}

export default function FindButton(props: FindButtonProps) {
  return (
    <Button {...props} type="submit" color="green">
      Cari
    </Button>
  );
}
