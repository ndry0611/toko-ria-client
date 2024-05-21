import React from "react";
import { useRouter } from "next/router";
import { useGetSales } from "../../../../api-hooks/sale-api";
import useTableDataGenerator from "../../../../hooks/use-table-data-generator";
import { NavigationRoutes } from "../../../../common/constants/route";
import { formatDate, stringToMoney } from "../../../../utils/string";
import { SaleListProps } from "../list";
import LoaderView from "../../component/loader-view";
import TableList from "../../component/table-list";

export default function SaleList(props: SaleListProps) {
  let { filter } = props;
  filter = {
    ...filter,
    daftar: "penjualan",
  };
  const { push } = useRouter();
  const query = useGetSales(filter);
  const { data = [] } = query;
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
        item.updated_at ? formatDate(item.updated_at) : "-",
      ];
    },
    onGenerateHead(item) {
      return ["Kode Bon", "Pelanggan", "Tanggal Bon", "Total Harga", "Metode Belanja", "Tanggal Pembayaran", "Status", "Tanggal Update"];
    },
  });
  return (
    <LoaderView query={query}>
      {(data) => <TableList data={table} />}
    </LoaderView>
  );
}
