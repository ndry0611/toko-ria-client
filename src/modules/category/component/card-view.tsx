import { Anchor, Card, Center, Container, Image, Text } from "@mantine/core";
import { Category } from "../type";
import { ImageSquare } from "@phosphor-icons/react";

export default function CategoryCard(item: Category) {
  return (
    <Anchor underline="never">
      <Card shadow="md" padding={"xs"} radius={"sm"} w={"200px"} h={"250px"}>
        <Card.Section>
          {item.file_name ? (
            <Image src="https://picsum.photos/250/200" alt="images" />
          ) : (
            <Center>
              <ImageSquare size={150} color="#FF852D" />
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
    </Anchor>
  );
}
