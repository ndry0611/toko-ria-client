import { ActionIcon, Button, Text } from "@mantine/core";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { color } from "../common/constants/color";

export default function BackButton() {
  const { back } = useRouter();
  return (
    <ActionIcon onClick={back} variant="subtle" >
      <CaretLeft size={24}/>
    </ActionIcon>
  );
}
