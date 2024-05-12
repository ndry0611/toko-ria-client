import { Button, Text } from "@mantine/core";
import { Plus } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";


export interface CreateButtonProps {
  route?:string
}

export default function CreateButton(props:CreateButtonProps) {
  const { pathname } = useRouter();
  const route = props?.route ?? pathname + "/create";
  return (
    <Link href={route}>
      <Button justify="center" leftSection={<Plus size={16} weight={"bold"} />}>
        <Text fw={500}>Tambah</Text>
      </Button>
    </Link>
  );
}
