import { useRouter } from "next/router";
import { useGetSparePart } from "../../../../api-hooks/spare-part-api";
import LoaderView from "../../../admin/component/loader-view";
import { PublicImageRoutes } from "../../../../common/constants/route";
import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Paper,
  Space,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { color } from "../../../../common/constants/color";
import { ImageSquare, Minus, Plus, ShoppingCart } from "@phosphor-icons/react";
import { stringToMoney } from "../../../../utils/string";
import Input from "../../../../component/input";
import Form from "../../../../component/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddCartDetailFormType,
  AddCartDetailSchema,
} from "../../cart/component/type";
import React from "react";

export default function SparePartDetail() {
  const { query } = useRouter();
  const id = query.id as string;
  const querySparePart = useGetSparePart(id);
  const { data } = querySparePart;

  const defaultValues = React.useMemo<AddCartDetailFormType>(() => {
    const price =
      (data
        ? data.SpecialPrice.length > 0
          ? data.SpecialPrice[0].price
          : data.sale_price
        : 0) ?? 0;

    return {
      id_spare_part: "",
      quantity: 1,
      price,
    };
  }, [data]);
  const methods = useForm({
    resolver: yupResolver(AddCartDetailSchema()),
    defaultValues,
  });

  const { setValue, watch } = methods;
  const quantity = watch("quantity");

  const increaseQuantity = () => {
    if (data && data.stock > quantity) {
      setValue("quantity", quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setValue("quantity", quantity - 1);
    }
  };

  return (
    <Form methods={methods} onSubmit={async () => {}}>
      <LoaderView query={querySparePart}>
        {(data) => (
          <>
            <Flex w={"100%"} pos={"relative"}>
              <ImageComponent fileName={data.file_name} />
            </Flex>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={700}>{data.name}</Text>
                {data.Car ? (
                  <>
                    <Text fz={14} fw={700}>
                      {data.Car.CarBrand.name} {data.Car.name}{" "}
                      {data.Car.production_year} {data.Car.type}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </Grid.Col>
              <Grid.Col span={6}>
                {data.SpecialPrice && data.SpecialPrice.length > 0 ? (
                  <>
                    <Text
                      fz={14}
                      td="line-through"
                      ta={"right"}
                      c={color.mainGrey}
                    >
                      {data.sale_price ? stringToMoney(data.sale_price) : "-"}
                    </Text>
                    <Text ta={"right"} fw={700}>
                      {stringToMoney(data.SpecialPrice[0].price)}
                    </Text>
                  </>
                ) : (
                  <Text fw={700} ta={"right"}>
                    {data.sale_price ? stringToMoney(data.sale_price) : "-"}
                  </Text>
                )}
                <Text ta={"right"} fz={14}>
                  /{data.sell_method}
                </Text>
              </Grid.Col>
            </Grid>
            <hr />
            <Paper>
              <Text fw={700}>Rincian Produk</Text>
              <Grid my={6}>
                <Grid.Col span={3}>
                  <Text fz={14}>Part Number </Text>
                  <Text fz={14}>Merk </Text>
                  <Text fz={14}>Stok </Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text>:</Text>
                  <Text>:</Text>
                  <Text>:</Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Text fw={600}>{data.part_no}</Text>
                  <Text fw={600}>
                    {data.SparePartBrand?.name}{" "}
                    {data.genuine === "asli" ? "Asli" : "Replika"}
                  </Text>
                  <Text fw={600}>{data.stock}</Text>
                </Grid.Col>
              </Grid>
              <Text fw={700}>Deskripsi Barang</Text>
              <Text fz={14}>{data.description}</Text>
            </Paper>
            <hr />
            <Space h={"lg"} />
          </>
        )}
      </LoaderView>
      <Flex justify={"space-between"}>
        <Flex gap={"md"}>
          <ActionIcon
            variant="outline"
            style={{ alignSelf: "center" }}
            onClick={decreaseQuantity}
          >
            <Minus size={12} />
          </ActionIcon>
          <Input type="number" name="quantity" maw={54} disabled />
          <ActionIcon
            variant="outline"
            style={{ alignSelf: "center" }}
            onClick={increaseQuantity}
          >
            <Plus size={12} />
          </ActionIcon>
        </Flex>
        <Button rightSection={<ShoppingCart />} type="submit">
          Tambahkan ke Keranjang
        </Button>
      </Flex>
    </Form>
  );
}

function ImageComponent(props: { fileName?: string | null }) {
  const { fileName } = props;
  const url = fileName ? `${PublicImageRoutes.spareParts}${fileName}` : "";
  if (url) {
    return (
      <Image
        onClick={(e) => {
          e.stopPropagation();
          window?.open(url, "_blank")?.focus();
        }}
        alt="image"
        fill
        src={url}
        style={{
          border: `1px solid ${color.mainBlack}`,
          objectFit: "cover",
          overflow: "hidden",
          borderRadius: 4,
          objectPosition: "top",
          maxWidth: 768,
          minHeight: 180,
        }}
      />
    );
  } else {
    return (
      <Flex
        w={"100%"}
        justify={"center"}
        bg={color.mainTheme}
        style={{ borderRadius: 4, border: `1px solid ${color.mainBlack}` }}
      >
        <ImageSquare size={180} />
      </Flex>
    );
  }
}
