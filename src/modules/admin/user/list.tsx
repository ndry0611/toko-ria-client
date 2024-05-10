import { TabsTabProps } from "@mantine/core";
import React from "react";
import Tabs from "../../../component/tabs";

export default function UserList() {
  const [activeTab, setActiveTab] = React.useState<string | null>("terdaftar");
  const tabList: TabsTabProps[] = [
    { value: "terdaftar", children: "terdaftar" },
    { value: "pending", children: "pending" },
    { value: "keluhan", children: "keluhan" },
  ];
  return (
    <Tabs data={tabList} value={activeTab} onChange={setActiveTab} mb={16} />
  );
}
