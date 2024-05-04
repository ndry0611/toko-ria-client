import ButtonSubmitField, {
  ButtonSubmitFieldProps,
} from "./button-sumbit-field";
import SelectInputField, { SelectInputFieldProps } from "./select-input-field";
import TextInputField, { TextInputFieldProps } from "./text-input-field";

export type InputProps =
  | TextInputFieldProps
  | SelectInputFieldProps
  | ButtonSubmitFieldProps;

export default function Input(props: InputProps) {
  switch (props.type) {
    case "submit":
      return <ButtonSubmitField {...props} />;
    case "select":
      return <SelectInputField {...props} />;
    case "text":
    case "email":
    default:
      return <TextInputField {...props} />;
  }
}
