import { useRouter } from "next/router";
import { GetSparePartModel } from "../../admin/spare-part/component/type";
import { PhotoPreview } from "../../../component/photo-input";
import { PublicImageRoutes } from "../../../common/constants/route";
import { ImageSquare } from "@phosphor-icons/react";
import { color } from "../../../common/constants/color";
import Link from "next/link";
import { Card, Center, Grid, Text } from "@mantine/core";
import { stringToMoney } from "../../../utils/string";

interface ItemPaperProps {
  item: GetSparePartModel;
}

export default function ItemPaper(props: ItemPaperProps) {
  const { item } = props;
  const { pathname } = useRouter();
  const itemImage = item.file_name ? (
    <PhotoPreview
      size={70}
      imageUrl={`${PublicImageRoutes.spareParts}${item.file_name}`}
    />
  ) : (
    <ImageSquare
      size={70}
      style={{ backgroundColor: color.mainTheme, borderRadius: 4 }}
    />
  );
  return (
    <Link href={pathname + `/${item.id}`} style={{ textDecoration: "none" }}>
      <Card radius={"md"} withBorder p={8}>
        <Grid m={8}>
          <Grid.Col span={3}>
            <Center>{itemImage}</Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fz={10} fw={500}>
              {item.part_no}
            </Text>
            <Text fz={12} fw={700}>
              {item.name}
            </Text>
            {item.Car ? (
              <Text fz={10}>
                {item.Car.CarBrand.name} {item.Car.name} {item.Car.type}
              </Text>
            ) : undefined}
            <Text fz={10}>
              {item.SparePartBrand?.name}{" "}
              {item.genuine === "asli" ? "Asli" : "Replika"}
            </Text>
            <Text fz={12} fw={500}>
              Stok: {item.stock}
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>
            {item.SpecialPrice && item.SpecialPrice.length > 0 ? (
              <>
                <Text td="line-through" fz={12} ta={"right"} c={color.mainGrey}>
                  {item.sale_price ? stringToMoney(item.sale_price) : "-"}
                </Text>
                <Text ta={"right"} fz={12} fw={700}>{stringToMoney(item.SpecialPrice[0].price)}</Text>
              </>
            ) : (
              <Text fz={12} fw={700} ta={"right"}>
                {item.sale_price ? stringToMoney(item.sale_price) : "-"}
              </Text>
            )}
            <Text fz={12}>/{item.sell_method}</Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Link>
  );
}
