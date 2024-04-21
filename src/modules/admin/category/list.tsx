import React from "react";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import { useRouter } from "next/router";
import TableList from "../component/table-list";
import { NavigationRoutes } from "../../../common/constants/route";
import { Flex, Space } from "@mantine/core";
import TitleText from "../component/title";
import CreateButton from "../component/create-button";
import { useGetCategories } from "../../../api-hooks/category-api";

export default function CategoryList() {
  const { push } = useRouter();
  const query = useGetCategories();
  const { data = [] } = query;

  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      push(`${NavigationRoutes.category}/${item.id}`);
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
      <TableList data={table}></TableList>
    </>
  );
}
