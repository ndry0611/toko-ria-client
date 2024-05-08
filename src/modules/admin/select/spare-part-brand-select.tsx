import { ComboboxItem } from "@mantine/core";
import {
  useGetSparePartBrands,
} from "../../../api-hooks/spare-part-brand-api";
import Input from "../../../component/input";
import { SelectInputFieldProps } from "../../../component/input/select-input-field";
import { SparePartBrandModel } from "../spare-part-brand/component/type";

type SparePartBrandOption = ComboboxItem & { item: SparePartBrandModel };

interface SparePartBrandSelectProps
  extends Omit<SelectInputFieldProps, "data" | "type" | "onAfterChange"> {
  onAfterChange?: (value: SparePartBrandOption) => void;
}

export function sparePartBrandTransfomer(value: SparePartBrandModel): SparePartBrandOption {
  return {
    value: value.id.toString(),
    label: value.name,
    item: value,
  };
}

export default function SparePartBrandSelect(props: SparePartBrandSelectProps) {
  const { onAfterChange, ...rest } = props;
  const { data } = useGetSparePartBrands();
  const options = (data || []).map((item) => sparePartBrandTransfomer(item));
  return (
    <Input
      type="select"
      data={options}
      onAfterChange={onAfterChange as any}
      {...rest}
    />
  );
}
