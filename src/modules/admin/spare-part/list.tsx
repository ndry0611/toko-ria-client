import { Flex, Space } from "@mantine/core";
import { useGetSpareParts } from "../../../api-hooks/sparePart-api";
import ItemPaper from "./component/item-paper";
import TitleText from "../component/title";

export default function SparePartList() {
  const query = useGetSpareParts();
  const { data = [] } = query;
  return (
    <>
      <TitleText>Barang</TitleText>
      <Space h={"sm"} />
      <Flex direction={"column"} gap={15}>
        {data.map((item) => {
          return (
            <ItemPaper
              key={item.id}
              id={item.id}
              SparePartBrand={item.SparePartBrand}
              name={item.name}
              part_no={item.part_no}
              stock={item.stock}
              is_available={item.is_available}
              sale_price={item.sale_price}
            />
          );
        })}
      </Flex>
    </>
  );
}
