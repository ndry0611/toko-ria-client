import ButtonSubmitField, {
  ButtonSubmitFieldProps,
} from "./button-sumbit-field";
import CheckBoxField, { CheckBoxInputFieldProps } from "./check-box-input-field";
import NumberInputField, { NumberInputFieldProps } from "./number-input-field";
import RadioInputField, { RadioInputFieldProps } from "./radio-input-field";
import SelectInputField, { SelectInputFieldProps } from "./select-input-field";
import TextAreaInputField, { TextAreaInputFieldProps } from "./text-area-input-field";
import TextInputField, { TextInputFieldProps } from "./text-input-field";

export type InputProps =
  | TextInputFieldProps
  | SelectInputFieldProps
  | NumberInputFieldProps
  | RadioInputFieldProps
  | TextAreaInputFieldProps
  | CheckBoxInputFieldProps
  | ButtonSubmitFieldProps;

export default function Input(props: InputProps) {
  switch (props.type) {
    case "submit":
      return <ButtonSubmitField {...props} />;
    case "select":
      return <SelectInputField {...props} />;
    case "number":
      return <NumberInputField {...props} />;
    case "check-box":
      return <CheckBoxField {...props} />;
    case "text-area":
      return <TextAreaInputField {...props} />;
    case "radio":
      return <RadioInputField {...props} />;
    case "text":
    case "email":
    default:
      return <TextInputField {...props} />;
  }
}
