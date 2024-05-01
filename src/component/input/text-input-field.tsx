import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import { useFormState } from "../form";
import { useController } from "react-hook-form";

export interface TextInputFieldProps extends TextInputProps {
  type: "text" | "email";
  name: string;
  onAfterChange?: (value: string) => void;
}

export default function TextInputField(props: TextInputFieldProps) {
  const { name, type, disabled, readOnly, onAfterChange, ...rest } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({ name });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;


  return (
    <TextInput
      {...rest}
      {...field}
      disabled={_disabled}
      error={error}
      inputWrapperOrder={["label", "input", "description", "error"]}
      onChange={(element) => {
        field.onChange(element.target.value);
        onAfterChange?.(element.target.value);
      }}
    />
  );
}
