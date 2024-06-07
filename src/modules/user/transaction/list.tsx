import { Flex, SimpleGrid, Text } from "@mantine/core";
import NavigationBar from "../../../component/navigation-bar/navigation-bar";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import { useGetSales } from "../../../api-hooks/sale-api";
import React from "react";
import { SalesFilter } from "../../admin/sales/components/type";
import { useForm } from "react-hook-form";
import Form from "../../../component/form";
import FindButton from "../../admin/component/find-button";
import Input from "../../../component/input";
import LoaderView from "../../admin/component/loader-view";
import TransactionCard from "./component/transaction-card";

export default function TransactionPage() {
  return (
    <PhoneLayout
      centerComponent={
        <Text fw={700} ta={"center"}>
          Transaksi
        </Text>
      }
      bottomContainer={<NavigationBar />}
    >
      <TransactionList />
    </PhoneLayout>
  );
}

function TransactionList() {
  const [saleFilter, setSaleFilter] = React.useState<SalesFilter>({});
  const methods = useForm({
    defaultValues: saleFilter,
  });

  const query = useGetSales(saleFilter);
  const { data = [] } = query;
  return (
    <>
      <Form
        methods={methods}
        onSubmit={(values) => {
          setSaleFilter(values);
        }}
      >
        <Flex direction={"column"} gap={"xs"}>
          <Input
            type="select"
            name="status"
            label="Status"
            w={"100%"}
            data={[
              { value: "1", label: "Packing" },
              { value: "2", label: "Dikirim" },
              { value: "3", label: "Dibatalkan" },
              { value: "4", label: "Selesai" },
            ]}
          />
          <SimpleGrid cols={2}>
            <Input type="date" name="start_date" label="Tanggal Awal" />
            <Input type="date" name="end_date" label="Tanggal Akhir" />
          </SimpleGrid>
          <FindButton fullWidth />
        </Flex>
      </Form>
      <hr style={{ marginTop: "8px" }} />
      <Flex gap={"sm"} direction={"column"}>
        <LoaderView query={query}>
          {(data) =>
            data.map((item) => {
              return <TransactionCard key={item.id} sale={item} />;
            })
          }
        </LoaderView>
      </Flex>
    </>
  );
}
