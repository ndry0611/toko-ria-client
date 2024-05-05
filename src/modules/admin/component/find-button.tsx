import { Button, ButtonProps } from "@mantine/core";
import { queryClient } from "../../../pages/_app";
import React from "react";
import { QueryKey } from "@tanstack/react-query";

interface FindButtonProps extends ButtonProps {
  qKey: QueryKey;
}

export default function FindButton(props: FindButtonProps) {
  const { qKey } = props;
  const onClick = React.useCallback(() => {
    queryClient.refetchQueries({ queryKey: qKey });
  }, [qKey]);

  return (
    <Button {...props} color="green" onClick={onClick}>
      Cari
    </Button>
  );
}
