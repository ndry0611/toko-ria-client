import { Flex, TableData, ActionIcon } from "@mantine/core";
import { Pen, Trash } from "@phosphor-icons/react";
import { format, parseISO } from "date-fns";
import { color } from "../common/constants/color";
import { formatDate } from "../utils/string";

interface UseTableDataGeneratorProps<T> {
  data: T[];
  onClickDelete?: (item: T) => void;
  onClickDetail?: (item: T) => void;
  onRowCustom?: (item: T) => any[];
  onGenerateFooter?: (item: T[]) => any[];
  onGenerateHead?: (item: keyof T[]) => any[];
}

interface ActionIconGroupProps {
  onClickDetail?: () => void;
  onClickDelete?: () => void;
}

function ActionIconGroup({
  onClickDetail,
  onClickDelete,
}: ActionIconGroupProps) {
  return (
    <Flex direction={"row"} gap={5}>
      {onClickDetail ? (
        <ActionIcon color={color.mustardYellow} onClick={onClickDetail}>
          <Pen size={14} />
        </ActionIcon>
      ) : (
        <span />
      )}
      {onClickDelete ? (
        <ActionIcon color="red" onClick={onClickDelete}>
          <Trash size={14} />
        </ActionIcon>
      ) : (
        <span />
      )}
    </Flex>
  );
}

export default function useTableDataGenerator<T extends object>(
  props: UseTableDataGeneratorProps<T>
): TableData {
  const {
    data = [],
    onClickDetail,
    onClickDelete,
    onRowCustom,
    onGenerateFooter,
    onGenerateHead,
  } = props;
  const hasAction = !!props.onClickDelete || !!props.onClickDetail;
  const row = data?.[0] ?? {};
  const head = Object.keys(row).map((key) => key);
  const body = data.map((item: any) => {
    const row =
      onRowCustom?.(item) ??
      head.map((key) => {
        const result = item[key];
        if (typeof result === "string") {
          const parsedDate = parseISO(result);
          if (!isNaN(parsedDate.getTime())) {
            return formatDate(parsedDate.toISOString());
          }
          return result;
        }
        return result;
      });
    if (hasAction) {
      row.push(
        (
          <ActionIconGroup
            onClickDetail={
              onClickDetail ? () => onClickDetail(item) : undefined
            }
            onClickDelete={
              onClickDelete ? () => onClickDelete(item) : undefined
            }
          />
        ) as any
      );
    }
    return row;
  });

  const thead = onGenerateHead?.(head as any) ?? head;
  if (hasAction) {
    thead.push("Action");
  }
  return {
    head: thead,
    body,
    foot: onGenerateFooter?.(data),
  };
}
