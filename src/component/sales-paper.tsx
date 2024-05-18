import {
  Container,
  Flex,
  Image,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Table,
  Text,
} from "@mantine/core";
import { useGetSale } from "../api-hooks/sale-api";
import useTableDataGenerator from "../hooks/use-table-data-generator";
import { GetSaleModel } from "../modules/admin/sales/components/type";

interface SalePaperProps {
  sale: GetSaleModel;
}

export default function SalePaper() {
  const query = useGetSale("1");
  const { data } = query;
  let idx = 0;
  const table = useTableDataGenerator({
    data: data?.SaleDetail ?? [],
    onRowCustom(item) {
      return [
        idx + 1,
        item.SparePart.part_no,
        item.SparePart.name,
        item.SparePart.SparePartBrand?.name,
        item.quantity,
        item.SparePart.sell_method,
        <Text ta='right' key={`${idx}-${item.SparePart.part_no}`}>
          <NumberFormatter value={item.price} thousandSeparator />
        </Text>,
        <Text ta='right' key={`${idx}-${item.SparePart.part_no}`}>
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
      <Paper withBorder w={"911px"} h={"529px"} p={"lg"}>
        <Flex justify={"space-between"} mb={10}>
          <Image src={"/logo-bnw.svg"} alt="logo" w={120} h={60} />
          <Flex gap={6}>
            <Text>Customer:</Text>
            <Flex direction={"column"}>
              <Text>{"ANDRY"}</Text>
              <Text>{"Jalan Iskandar Muda No.5 Sigli"}</Text>
            </Flex>
          </Flex>
          <Flex direction={"column"}>
            <Text>Nomor Faktur: {"F30/300"}</Text>
            <Text>Tanggal: {"20/12/2024 11:15"}</Text>
          </Flex>
        </Flex>
        <Table data={table} styles={{ th: { border: "1px solid" } }} />
        <Flex justify={"right"} style={{ borderTop: "1px solid" }}>
          Total :{" "}
          {<NumberFormatter prefix="Rp" value={200000} thousandSeparator />}
        </Flex>
      </Paper>
    </>
  );
}
