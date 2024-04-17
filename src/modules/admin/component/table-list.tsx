import { Table, TableProps } from "@mantine/core";

export default function TableList(props: TableProps) {
  return (
    <Table
      {...props}
      styles={{
        thead: {
          backgroundColor: "#FF852D",
          color: "white",
        },
        th: {
          fontWeight: "bold",
        },
      }}
    />
  );
}
