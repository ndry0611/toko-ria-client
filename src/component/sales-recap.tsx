import {
  Center,
  Flex,
  Image,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Space,
  Table,
  Text,
} from "@mantine/core";
import useTableDataGenerator from "../hooks/use-table-data-generator";
import { formatDate } from "../utils/string";
import React, { ForwardedRef, forwardRef } from "react";
import {
  GetSalesModel,
  SalesFilter,
} from "../modules/admin/sales/components/type";

interface SaleRecapProps {
  sales: GetSalesModel[];
}

const SalesRecap = forwardRef<HTMLDivElement, SaleRecapProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { sales } = props;
    const [grandTotal, setGrandTotal] = React.useState(0);
    React.useEffect(() => {
      const tempTotal = sales.reduce((total, item) => {
        return total + item.grand_total;
      }, 0);
      setGrandTotal(tempTotal);
    }, [sales]);
    const table = useTableDataGenerator({
      data: sales,
      onRowCustom(item) {
        return [
          item.code,
          item.User.name,
          item.payment_method == 1
            ? "Offline"
            : item.payment_method == 2
            ? "Online"
            : "-",
          item.status == 1 && !!item.payment_date
            ? "Menunggu Pembayaran"
            : item.status == 1 && item.payment_date
            ? "Packing"
            : item.status == 2
            ? "Dikirim"
            : item.status == 3
            ? "Dibatalkan"
            : item.status == 4
            ? "Selesai"
            : "-",
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
          "Metode Belanja",
          "Status",
          "Tanggal Bon",
          "Tanggal Pembayaran",
          "Total",
        ];
      },
    });
    return (
      <div ref={ref}>
        <Center>
          <Paper withBorder w={"911px"} mih={"100%"} p={"lg"}>
            <SimpleGrid cols={3}>
              <Image src={"/logo-bnw.svg"} alt="logo" w={120} h={60} />
              <Text
                ta={"center"}
                style={{ alignSelf: "center" }}
                fw={700}
                fz={28}
              >
                Laporan Penjualan
              </Text>
            </SimpleGrid>
            <Space h={"sm"} />
            <Text>Tanggal Cetak: {formatDate(new Date())}</Text>
            <Space h={"sm"} />
            <Table data={table} styles={{ th: { border: "1px solid" } }} />
            <Flex
              justify={"right"}
              style={{ borderTop: "1px solid" }}
              pr={"xs"}
            >
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
      </div>
    );
  }
);
SalesRecap.displayName = "Sales Recap";

export default SalesRecap;
