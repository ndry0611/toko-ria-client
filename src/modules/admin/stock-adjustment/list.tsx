import React from "react";
import { useGetStockAdjustments } from "../../../api-hooks/stock-adjustment-api";
import { StockAdjustmentFilter } from "./component/type";
import { useForm } from "react-hook-form";
import TitleText from "../component/title";
import { Flex, SimpleGrid, Space } from "@mantine/core";
import Form from "../../../component/form";
import LoaderView from "../component/loader-view";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import TableList from "../component/table-list";
import { formatDate } from "../../../utils/string";
import SparePartSelect from "../select/spare-part-select";
import Input from "../../../component/input";
import CreateButton from "../component/create-button";
import FindButton from "../component/find-button";

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
      return [
        item.code,
        item.SparePart.name,
        item.SparePart.SparePartBrand.name,
        item.old_quantity,
        item.new_quantity,
        item.description,
        item.created_at ? formatDate(item.created_at) : "-",
      ];
    },
    onGenerateHead(item) {
      return [
        "Kode Faktur",
        "Nama Barang",
        "Merk Barang",
        "Quantity Lama",
        "Quantity Baru",
        "Alasan Penyesuaian",
        "Tanggal Penyesuaian",
      ];
    },
  });

  return (
    <>
      <TitleText>Penyesuaian Barang</TitleText>
      <Space h={"sm"} />
      <Form
        methods={methods}
        onSubmit={(values) => {
          setStockAdjustmentFilter(values);
        }}
      >
        <SimpleGrid cols={3}>
          <SparePartSelect name="id_spare_part" label="Barang" />
          <Input type="date" name="start_date" label="Tanggal Awal" />
          <Input
            type="date"
            name="end_date"
            label="Tanggal Akhir"
          />
        </SimpleGrid>
        <Space h={"sm"} />
        <Flex justify={"right"} gap={15} m={"5px 0px"}>
          <FindButton />
          <CreateButton />
        </Flex>
        <Space h={"sm"} />
      </Form>
      <LoaderView query={query}>
        {(data) => <TableList data={table}></TableList>}
      </LoaderView>
    </>
  );
}
