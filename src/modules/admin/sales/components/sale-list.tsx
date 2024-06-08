import React from "react";
import { useRouter } from "next/router";
import { useGetSales } from "../../../../api-hooks/sale-api";
import useTableDataGenerator from "../../../../hooks/use-table-data-generator";
import { NavigationRoutes } from "../../../../common/constants/route";
import { formatDate, stringToMoney } from "../../../../utils/string";
import { SaleListProps } from "../list";
import LoaderView from "../../component/loader-view";
import TableList from "../../component/table-list";
import { useReactToPrint } from "react-to-print";
import PrintButton from "../../component/print-button";
import SalesRecap from "../../../../component/sales-recap";
import { Space } from "@mantine/core";

export default function SaleList(props: SaleListProps) {
  let { filter } = props;
  filter = {
    ...filter,
    daftar: "penjualan",
  };
  const { push } = useRouter();
  const query = useGetSales(filter);
  const { data = [] } = query;

  const componentRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      push(`${NavigationRoutes.sales}/${item.id}`);
    },
    onRowCustom(item) {
      return [
        item.code,
        item.User.name,
        item.created_at ? formatDate(item.created_at) : "-",
        item.grand_total ? stringToMoney(item.grand_total) : 0,
        item.payment_method == 1
          ? "Offline"
          : item.payment_method == 2
          ? "Online"
          : "-",
        item.payment_date ? formatDate(item.payment_date) : "-",
        getStatus(item.status, item.payment_date),
        item.updated_at ? formatDate(item.updated_at) : "-",
      ];
    },
    onGenerateHead(item) {
      return [
        "Kode Bon",
        "Pelanggan",
        "Tanggal Bon",
        "Total Harga",
        "Metode Belanja",
        "Tanggal Pembayaran",
        "Status",
        "Tanggal Update",
      ];
    },
  });
  return (
    <LoaderView query={query}>
      {(data) => (
        <>
          <PrintButton
            component={
              <SalesRecap ref={componentRef} sales={data} filter={filter} />
            }
            onPrint={handlePrint}
          />
          <Space h={"sm"} />
          <TableList data={table} />
        </>
      )}
    </LoaderView>
  );
}

function getStatus(status: number, payment_date?: string) {
  if (status === 1) {
    return payment_date ? "Packing" : "Menunggu Pembayaran";
  }
  switch (status) {
    case 2:
      return "Dikirim";
    case 3:
      return "Dibatalkan";
    case 4:
      return "Selesai";
    default:
      return "-";
  }
}