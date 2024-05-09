import React from "react";
import { useGetStockAdjustments } from "../../../api-hooks/stock-adjustment-api";
import { StockAdjustmentFilter } from "./component/type";
import { useForm } from "react-hook-form";
import TitleText from "../component/title";
import { Space } from "@mantine/core";
import Form from "../../../component/form";
import LoaderView from "../component/loader-view";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import TableList from "../component/table-list";

export default function StockAdjustmentList() {
  const [stockAdjustmentFilter, setStockAdjustmentFilter] =
    React.useState<StockAdjustmentFilter>({});

  const methods = useForm({
    defaultValues: stockAdjustmentFilter,
  });

  const query = useGetStockAdjustments(stockAdjustmentFilter);
  const { data = [] } = query;

  const table = useTableDataGenerator({
    data,
    onRowCustom(item) {
      return [item.code, item.SparePart.name, item.SparePart.SparePartBrand.name, item.old_quantity, item.new_quantity, item.description, item.created_at];
    },
    onGenerateHead(item) {
      return ["Kode Faktur", "Nama Barang", "Merk Barang","Quantity Lama","Quantity Baru", "Alasan Penyesuaian", "Tanggal Penyesuaian"]
    },
  })

  return (
    <>
      <TitleText>Penyesuaian Barang</TitleText>
      <Space h={"sm"} />
      <Form methods={methods} onSubmit={(values) => {setStockAdjustmentFilter(values)}}>
      </Form>
      <LoaderView query={query}>
        {(data) => <TableList data={table}></TableList>}
      </LoaderView>
    </>
  );
}
