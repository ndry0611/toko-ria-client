import {
  Center,
  Container,
  Flex,
  Image,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Space,
  Table,
  Text,
} from "@mantine/core";
import { useGetSale } from "../api-hooks/sale-api";
import useTableDataGenerator from "../hooks/use-table-data-generator";
import { GetSaleModel } from "../modules/admin/sales/components/type";
import { formatDate } from "../utils/string";

export default function SalePaper(id: string) {
  const query = useGetSale("2");
  const { data } = query;
  let idx = 0;
  const table = useTableDataGenerator({
    data: data?.SaleDetail ?? [],
    onRowCustom(item) {
      idx += 1;
      return [
        idx,
        item.SparePart.part_no,
        item.SparePart.name,
        item.SparePart.SparePartBrand?.name,
        item.quantity,
        item.SparePart.sell_method,
        <Text ta="right" key={`${idx}-${item.SparePart.part_no}`}>
          <NumberFormatter value={item.price} thousandSeparator />
        </Text>,
        <Text ta="right" key={`${idx}-${item.SparePart.part_no}`}>
          <NumberFormatter
            key={`${idx}-${item.SparePart.part_no}`}
            value={item.total_price}
            thousandSeparator
          />
        </Text>,
      ];
    },
    onGenerateHead(item) {
      return [
        "#",
        "Part Number",
        "Nama Barang",
        "Merk Barang",
        "Qty",
        "Satuan",
        "Harga @",
        "Jumlah",
      ];
    },
  });
  return (
    <>
      <Center>
        <Paper withBorder w={"911px"} h={"529px"} p={"lg"}>
          <Flex justify={"space-between"} mb={10}>
            <Image src={"/logo-bnw.svg"} alt="logo" w={120} h={60} />
            <Flex gap={6}>
              <Text>Customer:</Text>
              <Flex direction={"column"}>
                <Text>{data?.User.name}</Text>
                <Text>{data?.User.address}</Text>
              </Flex>
            </Flex>
            <Flex direction={"column"}>
              <Text>Nomor Faktur: {data?.code}</Text>
              <Text>
                Tanggal: {data?.created_at ? formatDate(data.created_at) : "-"}
              </Text>
            </Flex>
          </Flex>
          <Table data={table} styles={{ th: { border: "1px solid" } }} />
          <Flex justify={"right"} style={{ borderTop: "1px solid" }} pr={"xs"}>
            <Text>Total:</Text>
            <Space w={"sm"} />
            <NumberFormatter
              style={{ fontWeight: "bold" }}
              prefix="Rp."
              value={data?.grand_total}
              thousandSeparator
            />
          </Flex>
        </Paper>
      </Center>
    </>
  );
}
