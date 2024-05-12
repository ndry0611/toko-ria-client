import { ComboboxItem } from "@mantine/core";
import { useGetCarBrands } from "../../../api-hooks/car-brand-api";
import Input from "../../../component/input";
import { SelectInputFieldProps } from "../../../component/input/select-input-field";
import { CarBrandModel } from "../brand/component/car-brand-type";

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
