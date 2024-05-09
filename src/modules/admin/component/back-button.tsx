import { Button, Text } from "@mantine/core";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { color } from "../../../common/constants/color";

export default function BackButton() {
  const { back } = useRouter();
  return (
    <Button
      onClick={() => back()}
      justify="center"
      leftSection={<CaretLeft size={16} weight={"bold"} />}
      variant="transparent"
    >
      <Text fw={500}>Kembali</Text>
    </Button>
  );
}
