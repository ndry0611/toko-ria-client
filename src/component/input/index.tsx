import ButtonSubmitField, {
  ButtonSubmitFieldProps,
} from "./button-sumbit-field";
import CheckBoxField, {
  CheckBoxInputFieldProps,
} from "./check-box-input-field";
import DateInputField, { DateInputFieldProps } from "./date-input-field";
import NumberInputField, { NumberInputFieldProps } from "./number-input-field";
import RadioInputField, { RadioInputFieldProps } from "./radio-input-field";
import SelectInputField, { SelectInputFieldProps } from "./select-input-field";
import TextAreaInputField, {
  TextAreaInputFieldProps,
} from "./text-area-input-field";
import TextInputField, { TextInputFieldProps } from "./text-input-field";
import PasswordInputField, {
  PasswordInputFieldProps,
} from "./password-input-field";

export type InputProps =
  | TextInputFieldProps
  | PasswordInputFieldProps
  | SelectInputFieldProps
  | NumberInputFieldProps
  | RadioInputFieldProps
  | TextAreaInputFieldProps
  | CheckBoxInputFieldProps
  | DateInputFieldProps
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
    case "date":
      return <DateInputField {...props} />;
    case "password":
      return <PasswordInputField {...props} />;
    case "text":
    case "email":
    default:
      return <TextInputField {...props} />;
  }
}
