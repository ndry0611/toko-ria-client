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
import { useGetSales } from "../api-hooks/sale-api";
import useTableDataGenerator from "../hooks/use-table-data-generator";
import { formatDate } from "../utils/string";
import React from "react";

export default function SalesRecap() {
  const [grandTotal, setGrandTotal] = React.useState(0);
  const query = useGetSales();
  const { data = [] } = query;
  React.useEffect(() => {
    const tempTotal = data.reduce((total, item) => {
      return total + item.grand_total;
    }, 0);
    setGrandTotal(tempTotal);
  }, [data]);
  const table = useTableDataGenerator({
    data,
    onRowCustom(item) {
      return [
        item.code,
        item.User.name,
        item.created_at ? formatDate(item.created_at) : "-",
        item.payment_date ? formatDate(item.payment_date) : "-",
        <Text ta="right" key={`${item.id}-${item.User.name}`}>
          <NumberFormatter value={item.grand_total} thousandSeparator />
        </Text>,
      ];
    },
    onGenerateHead(item) {
      return [
        "Kode Bon",
        "Pelanggan",
        "Tanggal Bon",
        "Tanggal Pembayaran",
        "Total",
      ];
    },
  });
  return (
    <Center>
      <Paper withBorder w={"911px"} mih={"100%"} p={"lg"}>
        <SimpleGrid cols={3}>
          <Image src={"/logo-bnw.svg"} alt="logo" w={120} h={60} />
          <Text ta={"center"} style={{ alignSelf: "center" }} fw={700} fz={28}>
            Laporan Penjualan
          </Text>
        </SimpleGrid>
        <Space h={"sm"} />
        <Text>Metode Pembayaran: </Text>
        <Text>Tanggal: </Text>
        <Space h={"sm"} />
        <Table data={table} styles={{ th: { border: "1px solid" } }} />
        <Flex justify={"right"} style={{ borderTop: "1px solid" }} pr={"xs"}>
          <Text>Jumlah Total:</Text>
          <Space w={"sm"} />
          <NumberFormatter
            style={{ fontWeight: "bold" }}
            prefix="Rp."
            value={grandTotal}
            thousandSeparator
          />
        </Flex>
      </Paper>
    </Center>
  );
}
