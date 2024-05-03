import { useFormContext } from "react-hook-form";
import { useFormState } from "../../../component/form";
import { Button, Flex } from "@mantine/core";
import { color } from "../../../common/constants/color";

interface FormActionComponentProps {
  onClickDelete?: () => {};
}

export default function FormActionComponent({
  onClickDelete,
}: FormActionComponentProps) {
  const { disabled, setDisabled } = useFormState();
  const { getValues, formState } = useFormContext();
  const isEdit = !!getValues("data");

  const submitButton = !disabled && (
    <Button
      type="submit"
      color={"green"}
      loading={formState.isSubmitting}
    >
      Simpan
    </Button>
  );

  const editButton = disabled && isEdit && (
    <Button color={color.tuscanyYellow} onClick={() => setDisabled(false)}>
      Edit
    </Button>
  );

  const deleteButton = disabled && onClickDelete && (
    <Button color="red" onClick={onClickDelete}>
      Hapus
    </Button>
  );
  
  return (
    <Flex direction={"row"} gap={16}>
      {editButton}
      {submitButton}
      {deleteButton}
    </Flex>
  )
}
