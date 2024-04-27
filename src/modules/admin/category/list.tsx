import React from "react";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import { useRouter } from "next/router";
import TableList from "../component/table-list";
import { NavigationRoutes } from "../../../common/constants/route";
import { Center, Flex, Space, Text } from "@mantine/core";
import TitleText from "../component/title";
import CreateButton from "../component/create-button";
import {
  useDeleteCategory,
  useGetCategories,
} from "../../../api-hooks/category-api";
import LoaderView from "../component/loader-view";
import { modals } from "@mantine/modals";
import notification from "../../../component/notifications";
import { queryClient } from "../../../pages/_app";

export default function CategoryList() {
  const { push } = useRouter();
  const query = useGetCategories();
  const { data = [] } = query;
  const { mutateAsync } = useDeleteCategory();

  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      push(`${NavigationRoutes.category}/${item.id}`);
    },
    onClickDelete(item) {
      modals.openConfirmModal({
        title: "Hapus Kategori",
        children: (
          <Center>
            <Text>
              Apakah Anda yakin untuk menghapus{" "}
              <Text span fw={600}>
                {item.name}
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
            queryClient.refetchQueries({ queryKey: ["get-categories"], exact: true });
            notification.success({
              title: "Success",
              message: "Berhasil menghapus kategori",
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
    onRowCustom(item) {
      return [item.name, item.description];
    },
    onGenerateHead(item) {
      return ["Nama", "Deskripsi"];
    },
  });

  return (
    <>
      <TitleText>Kategori</TitleText>
      <Space h={"sm"} />
      <Flex justify={"right"}>
        <CreateButton />
      </Flex>
      <Space h={"sm"} />
      <LoaderView query={query}>
        {(data) => <TableList data={table}></TableList>}
      </LoaderView>
    </>
  );
}
