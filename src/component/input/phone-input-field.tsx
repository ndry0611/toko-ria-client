import React from "react";
import { InputBase, InputBaseProps } from "@mantine/core";
import { useFormState } from "../form";
import { useController } from "react-hook-form";
import { IMaskInput } from "react-imask";

export interface PhoneInputFieldProps extends InputBaseProps {
  type: "phone";
  name: string;
  onAfterChange?: (value: string) => void;
}

export default function PhoneInputField(props: PhoneInputFieldProps) {
  const { name, type, disabled, onAfterChange, ...rest } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({ name });

  const _disabled = disabled || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <InputBase
      {...rest}
      {...field}
      disabled={_disabled}
      error={error}
      component={IMaskInput}
      mask={"[0000 0000 0000 00]"}
      value={field.value || ""}
      onAccept={(value, mask) => {
        const unmaskedValue = mask.unmaskedValue;
        if (unmaskedValue !== field.value) {
          field.onChange(unmaskedValue);
          if (onAfterChange) {
            onAfterChange(unmaskedValue);
          }
        }
      }}
    />
  );
}
