import { Table, TableProps } from "@mantine/core";
import { color } from "../../../common/constants/color";

export default function TableList(props: TableProps) {
  return (
    <Table.ScrollContainer minWidth={1000}>
      <Table
        {...props}
        highlightOnHover
        styles={{
          thead: {
            backgroundColor: color.mainTheme,
            color: "white",
          },
          th: {
            fontWeight: "bold",
          },
        }}
      />
    </Table.ScrollContainer>
  );
}
