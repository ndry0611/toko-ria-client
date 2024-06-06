import { ImageSquare, Trash } from "@phosphor-icons/react";
import { PublicImageRoutes } from "../../../../common/constants/route";
import { PhotoPreview } from "../../../../component/photo-input";
import { CartDetailModel } from "./type";
import { color } from "../../../../common/constants/color";
import { ActionIcon, Card, Center, Grid, Text } from "@mantine/core";
import { stringToMoney } from "../../../../utils/string";
import React from "react";
import { useDeleteCartDetail } from "../../../../api-hooks/cart-api";
import { queryClient } from "../../../../pages/_app";
import notification from "../../../../component/notification";

interface CartDetailProps {
  item: CartDetailModel;
}

export default function CartDetail(props: CartDetailProps) {
  const { item } = props;
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
  const { mutateAsync } = useDeleteCartDetail();
  const cartDelete = React.useCallback(
    async (id: string) => {
      try {
        await mutateAsync(id);
        queryClient.refetchQueries({ queryKey: ["get-cart"] });
        notification.success({
          title: "Success",
          message: "Berhasil memperbaharui keranjang belanja",
        });
      } catch (e: any) {
        notification.error({
          title: e?.error,
          message: e?.message,
        });
      }
    },
    [mutateAsync]
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
          <Text fz={12} fw={700}>
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
          <Text fz={12} fw={500}>
            Stok: {item.SparePart.stock}
          </Text>
          <Text fz={12} fw={700}>
            {stringToMoney(item.price)} / {item.SparePart.sell_method}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text fz={14} fw={700} ta={"right"}>
            x{item.quantity} {item.SparePart.sell_method}
          </Text>
          <Text fz={14} fw={700} ta={"right"}>
            {stringToMoney(item.total_price)}
          </Text>
          <Center my={8}>
            <ActionIcon
              bg={"red"}
              onClick={() => cartDelete(item.id.toString())}
            >
              <Trash size={24} />
            </ActionIcon>
          </Center>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
