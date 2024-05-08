import { Checkbox, CheckboxProps } from "@mantine/core";
import { useFormState } from "../form";
import { useController } from "react-hook-form";
import { color } from "../../common/constants/color";

export interface CheckBoxInputFieldProps extends CheckboxProps {
  type: "check-box";
  name: string;
  onAfterChange?: (value: boolean) => void;
}

export default function CheckBoxField(props: CheckBoxInputFieldProps) {
  const { name, type, disabled, readOnly, onAfterChange, ...rest } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({ name });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <Checkbox
      {...rest}
      {...field}
      disabled={_disabled}
      error={error}
      checked={field.value}
      color={color.mainTheme}
      onChange={(val) => {
        field.onChange(val.currentTarget.checked);
        onAfterChange?.(val.currentTarget.checked);
      }}
    />
  );
}
