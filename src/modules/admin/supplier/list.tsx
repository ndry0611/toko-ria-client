import React from "react";
import { SupplierFilter } from "./component/type";
import {
  useDeleteSupplier,
  useGetSuppliers,
} from "../../../api-hooks/supplier-api";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import { NavigationRoutes } from "../../../common/constants/route";
import { modals } from "@mantine/modals";
import { Center, Flex, SimpleGrid, Space, Text } from "@mantine/core";
import { queryClient } from "../../../pages/_app";
import notification from "../../../component/notification";
import TitleText from "../component/title";
import Form from "../../../component/form";
import Input from "../../../component/input";
import FindButton from "../component/find-button";
import CreateButton from "../component/create-button";
import LoaderView from "../component/loader-view";
import TableList from "../component/table-list";

export default function SupplierList() {
  const [supplierFilter, setSupplierFilter] = React.useState<SupplierFilter>(
    {}
  );
  const { mutateAsync } = useDeleteSupplier();
  const { push } = useRouter();
  const methods = useForm({ defaultValues: supplierFilter });

  const query = useGetSuppliers(supplierFilter);
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      push(`${NavigationRoutes.supplier}/${item.id}`);
    },
    onClickDelete(item) {
      modals.openConfirmModal({
        title: "Hapus Supplier",
        children: (
          <Center>
            <Text>
              Apakah Anda yakin untuk menghapus supplier{" "}
              <Text span fw={600}>
                {item.company_name}
              </Text>{" "}
              ?
            </Text>
          </Center>
        ),
        labels: {
          confirm: "Hapus",
          cancel: "Tidak",
        },
        confirmProps: { color: "red" },
        onConfirm: async () => {
          try {
            await mutateAsync(item.id.toString());
            queryClient.refetchQueries({
              queryKey: ["get-suppliers"],
            });
            notification.success({
              title: "Success",
              message: "Berhasil menghapus supplier",
            });
          } catch (e: any) {
            notification.error({
              title: e?.error,
              message: e?.message,
            });
          }
        },
      });
    },
    onGenerateHead(item) {
      return [
        "Nama Perusahaan",
        "Nomor Telepon Perusahaan",
        "Penanggung Jawab",
        "Nomor Telepon Penanggung Jawab",
        "Alamat",
      ];
    },
    onRowCustom(item) {
      return [
        item.company_name,
        item.company_phone,
        item.pic_name,
        item.pic_phone,
        item.address ?? "-",
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
