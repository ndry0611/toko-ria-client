import React from "react";
import { SalesFilter } from "./components/type";
import { useForm } from "react-hook-form";
import TitleText from "../component/title";
import Tabs from "../../../component/tabs";
import { Flex, SimpleGrid, Space, TabsTabProps } from "@mantine/core";
import Form from "../../../component/form";
import UserSelect from "../select/user-select";
import Input from "../../../component/input";
import CreateButton from "../component/create-button";
import FindButton from "../component/find-button";
import SaleList from "./components/sale-list";
import OrderList from "./components/order-list";

export interface SaleListProps {
  filter: SalesFilter;
}

export default function SalesList() {
  const [saleFilter, setSaleFilter] = React.useState<SalesFilter>({});
  const [activeTab, setActiveTab] = React.useState<string | null>("penjualan");
  const tabList: TabsTabProps[] = [
    { value: "penjualan", children: "Daftar" },
    { value: "pesanan", children: "Pesanan" },
  ];
  const methods = useForm({ defaultValues: saleFilter });
  const changeTab = (value: string | null) => {
    setActiveTab(value);
    methods.reset();
    setSaleFilter({});
  };

  return (
    <>
      <TitleText>Penjualan</TitleText>
      <Tabs data={tabList} value={activeTab} onChange={changeTab} mb={16} />
      <Form
        methods={methods}
        onSubmit={(values) => {
          setSaleFilter(values);
        }}
      >
        {activeTab === "penjualan" && (
          <>
            <SaleFormFilter />
            <SaleList filter={saleFilter} />
          </>
        )}
        {activeTab === "pesanan" && (
          <>
            <OrderFormFilter />
            <OrderList filter={saleFilter} />
          </>
        )}
      </Form>
    </>
  );
}

function SaleFormFilter() {
  return (
    <>
      <SimpleGrid cols={3}>
        <Flex direction={"column"}>
          <UserSelect
            filtering={{ id_role: "2", status: true }}
            name="id_user"
            label="Pelanggan"
          />
          <Input type="text" name="code" label="Kode Bon" />
        </Flex>
        <Flex direction={"column"}>
          <Input type="date" name="start_date" label="Tanggal Awal" />
          <Input type="date" name="end_date" label="Tanggal Akhir" />
        </Flex>
        <Flex direction={"column"}>
          <Input
            type="select"
            label="Metode Pembayaran"
            name="payment_method"
            data={[
              { value: "1", label: "Offline" },
              { value: "2", label: "Online" },
            ]}
          />
        </Flex>
      </SimpleGrid>
      <Space h={"sm"} />
      <Flex gap={16}>
        <FindButton />
        <CreateButton />
      </Flex>
      <Space h={"sm"} />
    </>
  );
}
function OrderFormFilter() {
  return (
    <>
      <SimpleGrid cols={3} mb={16}>
        <UserSelect
          filtering={{ id_role: "2", status: true }}
          name="id_user"
          label="Pelanggan"
        />
        <Input
          type="select"
          name="status"
          label="Status"
          data={[
            { value: "1", label: "Packing" },
            { value: "2", label: "Dikirim" },
          ]}
        />
        <Flex>
          <FindButton style={{ alignSelf: "end" }} />
        </Flex>
      </SimpleGrid>
    </>
  );
}
