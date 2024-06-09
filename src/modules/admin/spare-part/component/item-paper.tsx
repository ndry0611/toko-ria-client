import { Card, Grid, Center, Text } from "@mantine/core";
import { ImageSquare } from "@phosphor-icons/react";
import { GetSparePartModel } from "./type";
import { stringToMoney } from "../../../../utils/string";
import Link from "next/link";
import { useRouter } from "next/router";
import { PhotoPreview } from "../../../../component/photo-input";
import { color } from "../../../../common/constants/color";
import { PublicImageRoutes } from "../../../../common/constants/route";

export default function ItemPaper(item: GetSparePartModel) {
  const { pathname } = useRouter();
  const itemImage = item.file_name ? (
    <PhotoPreview
      imageUrl={`${PublicImageRoutes.spareParts}${item.file_name}`}
    />
  ) : (
    <ImageSquare
      size={90}
      style={{ backgroundColor: (!item.is_available || item.stock < 1 ? color.notAvailable : color.mainTheme ), borderRadius: 4 }}
    />
  );
  return (
    <Link href={pathname + `/${item.id}`} style={{ textDecoration: "none" }}>
      <Card radius={"md"} withBorder p={0} bg={(!item.is_available || item.stock < 1 ? color.notAvailable : "" )}>
        <Grid m={"sm"}>
          <Grid.Col span={2}>
            <Center>{itemImage}</Center>
          </Grid.Col>
          <Grid.Col span={7}>
            <Text fz={20} fw={700}>
              {item.name}
            </Text>
            <Text fz={12}>Part Number: {item.part_no}</Text>
            <Text fz={12}>Merk: {item.SparePartBrand?.name}</Text>
            {item.Car ? (
              <Text fz={12}>
                Mobil: {item.Car.CarBrand.name} {item.Car.name} {item.Car.type}
              </Text>
            ) : (
              <span />
            )}
            <Text fz={12}>
              Satuan: /{item.sell_method}
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text fz={20} fw={700} ta={"right"}>
              {item.sale_price ? stringToMoney(item.sale_price) : "-"}
            </Text>
            <Text fz={14} ta={"right"}>
              Stok: {item.stock}
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Link>
  );
}
