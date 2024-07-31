import React from "react";
import { SupplierFilter } from "./component/type";
import {
  useGetSuppliers,
} from "../../../api-hooks/supplier-api";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import { NavigationRoutes } from "../../../common/constants/route";
import { Flex, SimpleGrid, Space} from "@mantine/core";
import TitleText from "../../../component/title";
import Form from "../../../component/form";
import Input from "../../../component/input";
import FindButton from "../component/find-button";
import CreateButton from "../component/create-button";
import LoaderView from "../component/loader-view";
import TableList from "../component/table-list";
import { formatPhone } from "../../../utils/string";

export default function SupplierList() {
  const [supplierFilter, setSupplierFilter] = React.useState<SupplierFilter>(
    {}
  );
  const { push } = useRouter();
  const methods = useForm({ defaultValues: supplierFilter });

  const query = useGetSuppliers(supplierFilter);
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      push(`${NavigationRoutes.supplier}/${item.id}`);
    },
    onGenerateHead(item) {
      return [
        "Nama Perusahaan",
        "Nomor Telepon Perusahaan",
        "Penanggung Jawab",
        "Nomor Telepon Penanggung Jawab",
        "Alamat",
        "Status"
      ];
    },
    onRowCustom(item) {
      return [
        item.company_name,
        formatPhone(item.company_phone),
        item.pic_name,
        formatPhone(item.pic_phone),
        item.address ?? "-",
        (item.status === "ACTIVE" ? "Aktif" : "Tidak Aktif")
      ];
    },
  });
  return (
    <>
      <TitleText>Supplier</TitleText>
      <Space h={"sm"} />
      <Form
        methods={methods}
        onSubmit={(values) => {
          setSupplierFilter(values);
        }}
      >
        <SimpleGrid cols={3}>
          <Input
            type="text"
            name="name_keyword"
            label="Nama"
            placeholder="Perusahaan / Penanggung Jawab"
          />
          <Flex align={"end"} gap={15}>
            <FindButton />
            <CreateButton />
          </Flex>
        </SimpleGrid>
      </Form>
      <Space h={"sm"} />
      <LoaderView query={query}>
        {(data) => <TableList data={table} />}
      </LoaderView>
    </>
  );
}
