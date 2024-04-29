import ButtonSubmitField, { ButtonSubmitFieldProps } from "./button-sumbit-field";
import TextInputField, { TextInputFieldProps } from "./text-input-field";

export type InputProps = 
  |TextInputFieldProps
  |ButtonSubmitFieldProps;

export default function Input(props: InputProps) {
  switch (props.type) {
    case "submit":
      return <ButtonSubmitField {...props} />
    case "text":
    case "email":
    default:
      return <TextInputField {...props} />;
  }
}
