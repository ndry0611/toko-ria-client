import React from "react";
import { Textarea, TextareaProps,  } from "@mantine/core";
import { useFormState } from "../form";
import { useController } from "react-hook-form";

export interface TextAreaInputFieldProps extends TextareaProps {
  type: "text-area";
  name: string;
  onAfterChange?: (value: string) => void;
}

export default function TextAreaInputField(props: TextAreaInputFieldProps) {
  const { name, type, disabled, readOnly, onAfterChange, ...rest } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({ name });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;


  return (
    <Textarea
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
