import { yupResolver } from "@hookform/resolvers/yup";
import { Space } from "@mantine/core";
import {
  GetUserModel,
  UpdateUserFormSchema,
  UpdateUserFormType,
} from "./user-type";
import { useForm } from "react-hook-form";
import Form from "../../../../component/form";
import Input from "../../../../component/input";
import FormActionComponent from "../../component/form-action-component";
import React from "react";

interface CustomerStatusFormProps {
  user?: GetUserModel;
  onSubmit: (values: UpdateUserFormType) => Promise<void>;
}

export default function CustomerStatusForm(props: CustomerStatusFormProps) {
  const { user, onSubmit } = props;
  const defaultValues = React.useMemo<UpdateUserFormType>(() => {
    return {
      status: user?.status,
      data: user,
    };
  }, [user]);

  const methods = useForm({
    resolver: yupResolver(UpdateUserFormSchema()),
    defaultValues,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!user}>
      <Input
        type="radio"
        name="status"
        data={[
          {
            value: "ACTIVE",
            label: "Aktif",
          },
          {
            value: "INACTIVE",
            label: "Tidak Aktif",
          },
        ]}
      />
      <Space h={"sm"} />
      <FormActionComponent />
    </Form>
  );
}
