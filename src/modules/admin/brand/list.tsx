import { Flex, Space, TabsTabProps } from "@mantine/core";
import React from "react";
import TitleText from "../component/title";
import Tabs from "../../../component/tabs";
import CarBrandList from "./component/car-brand/car-brand-list";
import SparePartBrandList from "./component/spare-part-brand/spare-part-brand-list";

export default function BrandList() {
  const [activeTab, setActiveTab] = React.useState<string | null>("mobil");
  const tabList: TabsTabProps[] = [
    { value: "mobil", children: "Mobil" },
    { value: "barang", children: "Barang" },
  ];

  const changeTab = (value: string | null) => {
    setActiveTab(value);
  };
  return (
    <>
      <TitleText>Merk</TitleText>
      <Space h={"sm"} />
      <Tabs data={tabList} value={activeTab} onChange={changeTab} mb={16} />
      {activeTab === "mobil" && <CarBrandList />}
      {activeTab === "barang" && <SparePartBrandList />}
    </>
  );
}
