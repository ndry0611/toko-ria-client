import React from "react";
import { InputBase, InputBaseProps } from "@mantine/core";
import { useFormState } from "../form";
import { useController } from "react-hook-form";
import { IMaskInput } from "react-imask";

export interface BankInputFieldProps extends InputBaseProps {
  type: "bank";
  name: string;
  onAfterChange?: (value: string) => void;
}

export default function BankInputField(props: BankInputFieldProps) {
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
      placeholder="(BANK) Nomor Rekening"
      component={IMaskInput}
      mask={"{(}[aaaaaaa]{)} 000 000 000 0"}
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
