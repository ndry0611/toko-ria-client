import { ComboboxItem } from "@mantine/core";
import {
  CarBrandModel,
  useGetCarBrands,
} from "../../../api-hooks/carBrand-api";
import Input from "../../../component/input";
import { SelectInputFieldProps } from "../../../component/input/select-input-field";

type CarBrandOption = ComboboxItem & { item: CarBrandModel };

interface CarBrandSelectProps
  extends Omit<SelectInputFieldProps, "data" | "type" | "onAfterChange"> {
  onAfterChange?: (value: CarBrandOption) => void;
}

export function carBrandTransfomer(value: CarBrandModel): CarBrandOption {
  return {
    value: value.id.toString(),
    label: value.name,
    item: value,
  };
}

export default function CarBrandSelect(props: CarBrandSelectProps) {
  const { onAfterChange, ...rest } = props;
  const { data } = useGetCarBrands();
  const options = (data || []).map((item) => carBrandTransfomer(item));
  return (
    <Input
      type="select"
      data={options}
      onAfterChange={onAfterChange as any}
      {...rest}
    />
  );
}
