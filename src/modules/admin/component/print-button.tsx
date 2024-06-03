import { Button, ButtonProps } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Printer } from "@phosphor-icons/react";
import React from "react";

interface PrintButtonProps extends ButtonProps {
  component: React.ReactNode;
  onPrint: () => void;
}

export default function PrintButton(props: PrintButtonProps) {
  const { component, onPrint } = props;
  return (
    <Button
      leftSection={<Printer size={18} />}
      onClick={() =>
        modals.openConfirmModal({
          children: component,
          size: "auto",
          labels: {
            confirm: "Cetak",
            cancel: "Kembali",
          },
          onConfirm: onPrint,
        })
      }
    >
      Print
    </Button>
  );
}
