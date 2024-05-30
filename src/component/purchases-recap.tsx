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
import { useGetPurchases } from "../api-hooks/purchase-api";
import useTableDataGenerator from "../hooks/use-table-data-generator";
import { formatDate } from "../utils/string";
import React from "react";

export default function PurchasesRecap() {
  const [grandTotal, setGrandTotal] = React.useState(0);
  const query = useGetPurchases();
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
        item.Supplier.company_name,
        item.purchase_date ? formatDate(item.purchase_date) : "-",
        item.credit_duration + " Hari",
        item.payment_date ? formatDate(item.payment_date) : "-",
        item.status == 1
          ? "Aktif"
          : item.status == 2
          ? "Lunas"
          : item.status == 3
          ? "Batal"
          : "",
        ,
        <Text ta="right" key={`${item.id}-${item.Supplier.company_name}`}>
          <NumberFormatter value={item.grand_total} thousandSeparator />
        </Text>,
      ];
    },
    onGenerateHead(item) {
      return [
        "Kode Bon",
        "Supplier",
        "Tanggal Bon",
        "Lama Kredit",
        "Tanggal Pembayaran",
        "Status",
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
            Laporan Pembelian
          </Text>
        </SimpleGrid>
        <Space h={"sm"} />
        <Text>Supplier: </Text>
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
