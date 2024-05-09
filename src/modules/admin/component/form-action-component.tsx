import { useFormContext } from "react-hook-form";
import { useFormState } from "../../../component/form";
import { Button, Flex } from "@mantine/core";
import { FloppyDisk, Pen, Trash } from "@phosphor-icons/react";

interface FormActionComponentProps {
  onClickDelete?: () => void;
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
      loading={formState.isSubmitting}
      leftSection={<FloppyDisk size={18} weight="bold" />}
    >
      Simpan
    </Button>
  );

  const editButton = disabled && isEdit && (
    <Button variant="outline" leftSection={<Pen size={18} weight="bold"/>} onClick={() => setDisabled(false)}>
      Edit
    </Button>
  );

  const deleteButton = disabled && onClickDelete && (
    <Button color="red" leftSection={<Trash size={18} weight="bold"/>} onClick={onClickDelete}>
      Hapus
    </Button>
  );

  return (
    <Flex direction={"row"} gap={16}>
      {editButton}
      {submitButton}
      {deleteButton}
    </Flex>
  );
}
