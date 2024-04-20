import { Paper, Grid, Center, Text } from "@mantine/core";
import { ImageSquare } from "@phosphor-icons/react";

export default function ItemPaper() {
  return (
    <Paper radius={"md"} shadow="lg">
      <Grid m={"sm"}>
        <Grid.Col span={3}>
          <Center>
            <ImageSquare size={120} color="FF852D" />
          </Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fz={20} fw={400}>
            Title
          </Text>
          <Text fz={12}>Part Number: {}</Text>
          <Text fz={12}>Merk: {}</Text>
          <Text fz={12}>Mobil: {"carBrand"} {"car"} {"type"}</Text>
          <Text fz={12}>: {"sell_method"}</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text fz={20} fw={400} ta={"right"}>
            {"price"}
          </Text>
          <Text fz={14} ta={"right"}>
            {"stok"}
          </Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
