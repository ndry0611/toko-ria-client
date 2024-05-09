import { Group, Radio, RadioGroupProps, RadioProps } from "@mantine/core";
import { useFormState } from "../form";
import { useController } from "react-hook-form";
import { color } from "../../common/constants/color";

export interface RadioInputFieldProps
  extends Omit<RadioGroupProps, "children"> {
  data: RadioProps[];
  type: "radio";
  name: string;
}

export default function RadioInputField(props: RadioInputFieldProps) {
  const { type, data, name, readOnly, ...rest } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });
  const error = fieldState?.error?.message;
  const disabled = readOnly || formState.disabled;
  return (
    <Radio.Group
      {...rest}
      {...field}
      readOnly={disabled}
      error={error}
      value={field.value}
      inputWrapperOrder={["label", "input", "description", "error"]}
      onChange={(val) => field.onChange(val)}
    >
      <Group>
        {data.map((radio, idx) => {
          return (
            <Radio
              key={idx as any}
              {...radio}
            />
          );
        })}
      </Group>
    </Radio.Group>
  );
}
