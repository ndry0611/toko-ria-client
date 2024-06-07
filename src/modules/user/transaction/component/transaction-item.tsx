import { Card, Center, Grid, Text } from "@mantine/core";
import { GetSaleModel, SaleDetailsModel } from "../../../admin/sales/components/type";
import { stringToMoney } from "../../../../utils/string";
import { PhotoPreview } from "../../../../component/photo-input";
import { ImageSquare } from "@phosphor-icons/react";
import { color } from "../../../../common/constants/color";
import { PublicImageRoutes } from "../../../../common/constants/route";

interface TransactionItemProps {
  item: SaleDetailsModel;
}

export default function TransactionItemProps(props: TransactionItemProps) {
  const {item} = props;
  const itemImage = item.SparePart.file_name ? (
    <PhotoPreview
      size={70}
      imageUrl={`${PublicImageRoutes.spareParts}${item.SparePart.file_name}`}
    />
  ) : (
    <ImageSquare
      size={70}
      style={{ backgroundColor: color.mainTheme, borderRadius: 4 }}
    />
  );
  return (
    <Card radius={"md"} withBorder p={8}>
      <Grid m={8}>
        <Grid.Col span={3}>
          <Center>{itemImage}</Center>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fz={10} fw={500}>
            {item.SparePart.part_no}
          </Text>
          <Text fz={10} fw={700}>
            {item.SparePart.name}
          </Text>
          {item.SparePart.Car ? (
            <Text fz={10}>
              {item.SparePart.Car.CarBrand.name} {item.SparePart.Car.name}{" "}
              {item.SparePart.Car.type}
            </Text>
          ) : undefined}
          <Text fz={10}>
            {item.SparePart.SparePartBrand?.name}{" "}
            {item.SparePart.genuine === "asli" ? "Asli" : "Replika"}
          </Text>
          <Text fz={10} fw={500}>
            Stok: {item.SparePart.stock}
          </Text>
          <Text fz={10} fw={700}>
            {stringToMoney(item.price)} / {item.SparePart.sell_method}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text fz={10} fw={700} ta={"right"}>
            x{item.quantity} {item.SparePart.sell_method}
          </Text>
          <Text fz={10} fw={700} ta={"right"}>
            {stringToMoney(item.total_price)}
          </Text>
        </Grid.Col>
      </Grid>
    </Card>
  )
}