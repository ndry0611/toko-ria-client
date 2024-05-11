import { Flex, TableData, ActionIcon } from "@mantine/core";
import { Check, Pen, Trash, X } from "@phosphor-icons/react";
import { parseISO } from "date-fns";
import { formatDate } from "../utils/string";

interface UseTableDataGeneratorProps<T> {
  data: T[];
  onClickDelete?: (item: T) => void;
  onClickDetail?: (item: T) => void;
  onClickApprove?: (item: T) => void;
  onClickDeny?: (item: T) => void;
  onRowCustom?: (item: T) => any[];
  onGenerateFooter?: (item: T[]) => any[];
  onGenerateHead?: (item: keyof T[]) => any[];
}

interface ActionIconGroupProps {
  onClickDetail?: () => void;
  onClickDelete?: () => void;
  onClickApprove?: () => void;
}

function ActionIconGroup({
  onClickDetail,
  onClickDelete,
  onClickApprove,
}: ActionIconGroupProps) {
  return (
    <Flex direction={"row"} gap={5}>
      {onClickDetail ? (
        <ActionIcon variant="outline" onClick={onClickDetail}>
          <Pen size={14} />
        </ActionIcon>
      ) : (
        <span />
      )}
      {onClickApprove ? (
        <ActionIcon onClick={onClickApprove}>
          <Check size={14} weight="bold"/>
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
    onClickApprove,
    onClickDelete,
    onRowCustom,
    onGenerateFooter,
    onGenerateHead,
  } = props;
  const hasAction =
    !!props.onClickDelete || !!props.onClickDetail || !!props.onClickApprove;
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
            onClickApprove={
              onClickApprove ? () => onClickApprove(item) : undefined
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
