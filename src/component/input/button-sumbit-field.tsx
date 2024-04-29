import { Button, ButtonProps } from "@mantine/core";
import { useFormContext } from "react-hook-form";

export interface ButtonSubmitFieldProps extends ButtonProps {
  type: "submit";
}

export default function ButtonSubmitField(props: ButtonSubmitFieldProps) {
  const { children = "Simpan", ...rest } = props;
  const { formState } = useFormContext();
  return (
    <Button
      {...rest}
      type="submit"
      loading={formState.isSubmitting}
      disabled={formState.isSubmitting}
    >
      {children}
    </Button>
  );
}
