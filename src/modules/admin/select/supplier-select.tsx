import { ComboboxItem } from "@mantine/core";
import { SupplierFilter, SupplierModel } from "../supplier/component/type";
import { SelectInputFieldProps } from "../../../component/input/select-input-field";
import { useGetSuppliers } from "../../../api-hooks/supplier-api";
import Input from "../../../component/input";

type SupplierOption = ComboboxItem & { item: SupplierModel };

interface SupplierSelectProps
  extends Omit<SelectInputFieldProps, "data" | "type" | "onAfterChange"> {
  filtering?: SupplierFilter;
  onAfterChange?: (values: SupplierOption) => void;
}

export function supplierTransformer(value: SupplierModel): SupplierOption {
  return {
    value: value.id.toString(),
    label: value.company_name,
    item: value,
  };
}

export default function SupplierSelect(props: SupplierSelectProps) {
  const { filtering, onAfterChange, ...rest } = props;
  const { data } = useGetSuppliers(filtering);
  const options = (data || []).map((item) => supplierTransformer(item));
  return (
    <Input
      type="select"
      data={options}
      onAfterChange={onAfterChange as any}
      {...rest}
    />
  );
}
