import React from "react";
import { callApi } from "../../../utils/api";
import { Category } from "./component/type";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import { useRouter } from "next/router";
import TableList from "../component/table-list";
import { NavigationRoutes } from "../../../common/constants/route";
import { Container, Flex, Space } from "@mantine/core";
import TitleText from "../component/title";
import CreateButton from "../component/create-button";

export default function CategoryList() {
  const [catalog, setCatalog] = React.useState<Category[]>([]);
  const { push } = useRouter();
  React.useEffect(() => {
    try {
      const getCatalog = async () => {
        const result = await callApi({ url: "/category" });
        const data = await result.json();
        setCatalog(data);
      };
      getCatalog();
    } catch (error) {
      //Sent user/admin to 500 page (?)
    }
  }, []);
  const table = useTableDataGenerator({
    data: catalog,
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
