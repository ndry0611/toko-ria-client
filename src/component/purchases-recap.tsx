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
import { useGetPurchases } from "../api-hooks/purchase-api";
import useTableDataGenerator from "../hooks/use-table-data-generator";
import { formatDate } from "../utils/string";
import React, { ForwardedRef, forwardRef } from "react";
import {
  GetPurchasesModel,
  PurchaseFilter,
} from "../modules/admin/purchase/component/type";

interface PurchaseRecapProps {
  purchases?: GetPurchasesModel[];
  filter?: PurchaseFilter;
}

const PurchasesRecap = forwardRef<HTMLDivElement, PurchaseRecapProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { purchases, filter } = props;
    const [grandTotal, setGrandTotal] = React.useState(0);
    React.useEffect(() => {
      const tempTotal = purchases!.reduce((total, item) => {
        return total + item.grand_total;
      }, 0);
      setGrandTotal(tempTotal);
    }, [purchases]);
    const table = useTableDataGenerator({
      data: purchases ?? [],
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
                Laporan Pembelian
              </Text>
            </SimpleGrid>
            <Space h={"sm"} />
            <Text>
              Supplier:{" "}
              {filter?.id_supplier
                ? purchases
                  ? purchases[0]?.Supplier.company_name ?? "Data Kosong"
                  : "Semua"
                : "Data Kosong"}
            </Text>
            <Text>
              Tanggal Pembelian:{" "}
              {filter?.start_date
                ? formatDate(filter.start_date, "dd/MM/yyyy")
                : "Awal"}{" "}
              -{" "}
              {filter?.end_date
                ? formatDate(filter.end_date, "dd/MM/yyyy")
                : "Akhir"}
            </Text>
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
PurchasesRecap.displayName = "Purchases Recap";

export default PurchasesRecap;
