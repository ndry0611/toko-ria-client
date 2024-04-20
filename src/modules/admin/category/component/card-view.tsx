import { Card, Center, Image, Text } from "@mantine/core";
import { Category } from "./type";
import { ImageSquare } from "@phosphor-icons/react";
import Link from "next/link";

export default function CategoryCard(item: Category) {
  return (
    <Link href={"#"}>
      <Card shadow="md" padding={"xs"} radius={"sm"} w={"200px"} h={"250px"}>
        <Card.Section>
          {item.file_name ? (
            <Image
              w={200}
              h={150}
              fit="fill"
              src={`/categories/${item.file_name}`}
              alt="images"
            />
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
