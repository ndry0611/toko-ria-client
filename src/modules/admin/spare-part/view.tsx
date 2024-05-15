import { TabsTabProps } from "@mantine/core";
import React from "react";
import Tabs from "../../../component/tabs";
import SparePartView from "./component/spare-part-view";
import SpecialPricePage from "../special-price/page";

export default function SparePartDetail() {
  const [activeTab, setActiveTab] = React.useState<string | null>("barang");
  const tabList: TabsTabProps[] = [
    { value: "barang", children: "Barang" },
    { value: "harga", children: "Harga Khusus" },
  ];
  return (
    <>
      <Tabs data={tabList} value={activeTab} onChange={setActiveTab} mb={16} />
      {activeTab === "barang" && <SparePartView />}
      {activeTab === "harga" && <SpecialPricePage />}
    </>
  );
}
