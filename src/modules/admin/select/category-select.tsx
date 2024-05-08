import { ComboboxData, ComboboxItem } from "@mantine/core";
import { useGetCategories } from "../../../api-hooks/category-api";
import Input from "../../../component/input";
import { SelectInputFieldProps } from "../../../component/input/select-input-field";
import { CategoryModel } from "../category/component/type";

type CategoryOption = ComboboxItem & { item: CategoryModel };

interface CategorySelectProps
  extends Omit<SelectInputFieldProps, "data" | "type" | "onAfterChange"> {
  onAfterChange?: (value: CategoryOption) => void;
}

export function categoryTransfomer(value: CategoryModel): CategoryOption {
  return {
    value: value.id.toString(),
    label: value.name,
    item: value,
  };
}

export default function CategorySelect(props: CategorySelectProps) {
  const { onAfterChange, ...rest } = props;
  const { data } = useGetCategories();
  const options = (data || []).map((item) => categoryTransfomer(item));
  return (
    <Input
      type="select"
      data={options}
      onAfterChange={onAfterChange as any}
      {...rest}
    />
  );
}
