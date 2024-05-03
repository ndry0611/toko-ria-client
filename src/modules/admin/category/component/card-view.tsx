import { Card, Center, Image, Text } from "@mantine/core";
import { CategoryModel } from "./type";
import { ImageSquare } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PUBLIC_URL } from "../../../../utils/api";

export default function CategoryCard(item: CategoryModel) {
  const { pathname } = useRouter();

  return (
    <Link href={pathname + `/${item.id}`} style={{ textDecoration: "none" }}>
      <Card shadow="md" padding={"xs"} radius={"sm"} w={"200px"} h={"250px"}>
        <Card.Section>
          {item.file_name ? (
            <Center>
              <Image
                w={200}
                h={150}
                fit="fill"
                src={`${PUBLIC_URL}/uploads/categories/${item.file_name}`}
                alt="images"
              />
            </Center>
          ) : (
            <Center>
              <ImageSquare size={150} color="FF852D" />
            </Center>
          )}
        </Card.Section>
        <Text size="md" ta={"center"}>
          {item.name}
        </Text>
        <Center>
          <Text size="xs">{item.description}</Text>
        </Center>
      </Card>
    </Link>
  );
}
