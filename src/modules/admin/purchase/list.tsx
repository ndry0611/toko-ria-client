import { Flex, SimpleGrid, Space, Table, TabsTabProps } from "@mantine/core";
import React from "react";
import { useForm } from "react-hook-form";
import { PurchaseFilter } from "./component/type";
import TitleText from "../component/title";
import Form from "../../../component/form";
import Input from "../../../component/input";
import SupplierSelect from "../select/supplier-select";
import CreateButton from "../component/create-button";
import FindButton from "../component/find-button";
import Tabs from "../../../component/tabs";
import { useGetPurchases } from "../../../api-hooks/purchase-api";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import TableList from "../component/table-list";
import LoaderView from "../component/loader-view";
import { NavigationRoutes } from "../../../common/constants/route";
import { formatDate, stringToMoney } from "../../../utils/string";
import { useRouter } from "next/router";

export default function PurchaseList() {
  const [purchaseFilter, setPurchaseFilter] = React.useState<PurchaseFilter>({
    status: "1",
  });

  const tabList: TabsTabProps[] = [
    { value: "1", children: "Aktif" },
    { value: "2", children: "Lunas" },
    { value: "3", children: "Batal" },
  ];
  const methods = useForm({
    defaultValues: purchaseFilter,
  });
  const { push } = useRouter();
  const query = useGetPurchases(purchaseFilter);
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      push(`${NavigationRoutes.purchase}/${item.id}`);
    },
    onRowCustom(item) {
      return [
        item.code,
        item.Supplier.company_name,
        item.purchase_date ? formatDate(item.purchase_date) : "-",
        item.grand_total ? stringToMoney(item.grand_total) : 0,
      ];
    },
    onGenerateHead(item) {
      return ["Kode Bon", "Supplier", "Tanggal Bon", "Total Harga"];
    },
  });
  return (
    <>
      <TitleText>Pembelian</TitleText>
      <Space h={"sm"} />
      <Form
        methods={methods}
        onSubmit={(values) => {
          setPurchaseFilter((prev)=>{
            return {
              ...prev,
              ...values,
            }
          });
        }}
      >
        <SimpleGrid cols={3}>
          <Flex direction={"column"} gap={16}>
            <SupplierSelect name="id_supplier" label="Supplier" />
            <Input type="text" name="code" label="Kode Bon" />
          </Flex>
          <Flex direction={"column"} gap={16}>
            <Input type="date" name="start_date" label="Tanggal Awal" />
            <Input type="date" name="end_date" label="Tanggal Akhir" />
          </Flex>
          <Flex style={{ alignItems: "end" }} gap={16}>
            <FindButton />
            <CreateButton />
          </Flex>
        </SimpleGrid>
        <Space h={"sm"} />
        <Tabs
          data={tabList}
          value={purchaseFilter.status || "1"}
          onChange={(value) => {
            setPurchaseFilter((prev) => {
              return {
                ...prev,
                status: value || "1",
              };
            });
          }}
          mb={16}
        />
        <LoaderView query={query}>
          {(data) => <TableList data={table} />}
        </LoaderView>
      </Form>
    </>
  );
}
