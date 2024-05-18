import React from "react";
import { useRouter } from "next/router";
import { useGetSales } from "../../../../api-hooks/sale-api";
import useTableDataGenerator from "../../../../hooks/use-table-data-generator";
import { NavigationRoutes } from "../../../../common/constants/route";
import { formatDate, stringToMoney } from "../../../../utils/string";
import { SaleListProps } from "../list";
import LoaderView from "../../component/loader-view";
import TableList from "../../component/table-list";

export default function OrderList(props: SaleListProps) {
  let { filter } = props;
  filter = {
    ...filter,
    daftar: "pesanan",
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
      ];
    },
    onGenerateHead(item) {
      return ["Kode Bon", "Pelanggan", "Tanggal Bon", "Total Harga"];
    },
  });
  return (
    <LoaderView query={query}>
      {(data) => <TableList data={table} />}
    </LoaderView>
  );
}
