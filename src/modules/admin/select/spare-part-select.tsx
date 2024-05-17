import { ComboboxItem } from "@mantine/core";
import { useGetSpareParts } from "../../../api-hooks/spare-part-api";
import Input from "../../../component/input";
import { SelectInputFieldProps } from "../../../component/input/select-input-field";
import { SparePartModel, SparePartsFilter } from "../spare-part/component/type";

type SparePartOption = ComboboxItem & { item: SparePartModel };

interface SparePartSelectProps
  extends Omit<SelectInputFieldProps, "data" | "type" | "onAfterChange"> {
  filtering?: SparePartsFilter;
  onAfterChange?: (value: SparePartOption | null) => void;
}

export function sparePartTransfomer(value: SparePartModel): SparePartOption {
  return {
    value: value.id.toString(),
    label: value.name,
    item: value,
  };
}

export default function SparePartSelect(props: SparePartSelectProps) {
  const { filtering, onAfterChange, ...rest } = props;
  const { data } = useGetSpareParts(filtering);
  const options = (data || []).map((item) => sparePartTransfomer(item));
  return (
    <Input
      type="select"
      data={options}
      onAfterChange={onAfterChange as any}
      {...rest}
    />
  );
}
