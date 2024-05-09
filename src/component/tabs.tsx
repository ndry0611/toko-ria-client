import { Tabs as RawTabs, TabsProps as RawTabsProps, TabsTabProps } from "@mantine/core";
import React from "react";

export interface TabsProps extends RawTabsProps {
  data: TabsTabProps[];
}

export default function Tabs(props: TabsProps) {
  const { data } = props;
  return (
    <RawTabs {...props}>
      <RawTabs.List>
        {data.map((item) => {
          return (
            <RawTabs.Tab key={item.value} value={item.value}>
              {item.children}
            </RawTabs.Tab>
          );
        })}
      </RawTabs.List>
    </RawTabs>
  );
}
