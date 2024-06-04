import { Card, Center, Image, Text } from "@mantine/core";
import { CategoryModel } from "../modules/admin/category/component/type";
import { ImageSquare } from "@phosphor-icons/react";
import Link from "next/link";
import {
  NavigationRoutes,
  PublicImageRoutes,
} from "../common/constants/route";

interface CategoryCardProps {
  item: CategoryModel;
  type: "user" | "admin";
}

export default function CategoryCard(props: CategoryCardProps) {
  const { item, type } = props;
  const href =
    type === "admin"
      ? `${NavigationRoutes.sparePart}?id_category=${item.id}`
      : `${NavigationRoutes.sparePartUser}?id_category=${item.id}`;
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
    >
      <Card
        shadow="xs"
        withBorder
        padding={"xs"}
        radius={"sm"}
        w={"200px"}
        h={"250px"}
      >
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
