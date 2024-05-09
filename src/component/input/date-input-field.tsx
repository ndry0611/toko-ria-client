import { DateInput, DateInputProps, DateValue } from "@mantine/dates";
import React from "react";
import { useController } from "react-hook-form";
import { useFormState } from "../form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.locale("id");
dayjs.extend(customParseFormat);

export interface DateInputFieldProps extends Omit<DateInputProps, "type"> {
  type: "date";
  name: string;
  onAfterChange?: (value: DateValue) => void;
}

export default function DateInputField(props: DateInputFieldProps) {
  const {
    type,
    name,
    onAfterChange,
    disabled,
    readOnly,
    valueFormat = "DD/MM/YYYY",
    ...rest
  } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });
  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;
  const dateParser = (value: string) => dayjs(value, valueFormat).toDate();

  return (
    <DateInput
      {...rest}
      {...field}
      disabled={_disabled}
      error={error}
      valueFormat={valueFormat}
      inputWrapperOrder={["label", "input", "description", "error"]}
      dateParser={dateParser}
      onChange={(val) => {
        field.onChange(val);
        onAfterChange?.(val);
      }}
    />
  );
}
