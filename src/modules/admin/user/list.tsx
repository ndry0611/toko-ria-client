import { Flex, SimpleGrid, Space, TabsTabProps } from "@mantine/core";
import React from "react";
import Tabs from "../../../component/tabs";
import TitleText from "../component/title";
import Form from "../../../component/form";
import { useForm } from "react-hook-form";
import { UserFilter } from "./component/user-type";
import Input from "../../../component/input";
import FindButton from "../component/find-button";
import CreateButton from "../component/create-button";
import CustomerList from "./component/customer-list";
import ComplaintList from "./component/complaint-list";

export default function UserList() {
  const [userFilter, setUserFilter] = React.useState<UserFilter>({});
  const [activeTab, setActiveTab] = React.useState<string | null>("terdaftar");
  const tabList: TabsTabProps[] = [
    { value: "terdaftar", children: "Terdaftar" },
    { value: "pending", children: "Pending" },
    { value: "keluhan", children: "Keluhan" },
  ];

  const methods = useForm({ defaultValues: userFilter });

  return (
    <>
      <TitleText>Pelanggan</TitleText>
      <Space h={"sm"} />
      <Form
        methods={methods}
        onSubmit={(values) => {
          setUserFilter(values);
        }}
      >
        <SimpleGrid cols={3}>
          <Input type="text" label="Nama Pelanggan" name="name" />
          <Flex align={"end"} gap={16}>
            <FindButton />
            {activeTab === "terdaftar" && <CreateButton />}
          </Flex>
        </SimpleGrid>
        <Space h={"sm"} />
        <Tabs
          data={tabList}
          value={activeTab}
          onChange={setActiveTab}
          mb={16}
        />
        {activeTab === "terdaftar" && <CustomerList />}
        {activeTab === "keluhan" && <ComplaintList />}
      </Form>
    </>
  );
}
