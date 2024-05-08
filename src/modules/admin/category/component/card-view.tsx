import { Card, Center, Image, Text } from "@mantine/core";
import { CategoryModel } from "./type";
import { ImageSquare } from "@phosphor-icons/react";
import Link from "next/link";
import { NavigationRoutes, PublicImageRoutes } from "../../../../common/constants/route";

export default function CategoryCard(item: CategoryModel) {
  return (
    <Link href={`${NavigationRoutes.sparePart}?id_category=${item.id}`} style={{ textDecoration: "none" }}>
      <Card shadow="md" padding={"xs"} radius={"sm"} w={"200px"} h={"250px"}>
        <Card.Section>
          {item.file_name ? (
            <Center>
              <Image
                w={200}
                h={150}
                fit="fill"
                src={`${PublicImageRoutes.categories}${item.file_name}`}
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
