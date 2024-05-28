import { ComboboxItem, Select, SelectProps } from "@mantine/core";
import { useFormState } from "../form";
import { useController } from "react-hook-form";

export interface SelectInputFieldProps extends SelectProps {
  type:"select",
  name: string,
  onAfterChange?: (value: ComboboxItem) => void;
}

export default function SelectInputField(props: SelectInputFieldProps) {
  const {
    name,
    type,
    disabled,
    readOnly,
    onAfterChange,
    ...rest
  } = props;
  const formState = useFormState();

  const {field, fieldState} = useController({
    name
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <Select
    placeholder="Semua"
    {...rest}
    {...field}
    disabled={_disabled}
    searchable
    clearable
    error={error}
    inputWrapperOrder={["label", "input", "description", "error"]}
    onChange={(element,option) => {
      field.onChange(element);
      onAfterChange?.(option)
    }}
    />
  )
}