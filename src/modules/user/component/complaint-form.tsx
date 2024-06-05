import { useForm } from "react-hook-form";
import {
  ComplaintFormSchema,
  ComplaintFormType,
} from "../../../api-hooks/complaint-api";
import { GetUserModel } from "../../admin/user/component/user-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Center, Flex, Text, TextInput } from "@mantine/core";
import Form from "../../../component/form";
import Input from "../../../component/input";
import { color } from "../../../common/constants/color";
import { Info } from "@phosphor-icons/react";
import FormActionComponent from "../../admin/component/form-action-component";
import React from "react";

interface ComplaintFormProps {
  user: GetUserModel;
  onSubmit: (values: ComplaintFormType) => Promise<void>;
}

export default function ComplaintForm(props: ComplaintFormProps) {
  const { user, onSubmit } = props;
  const defaultValues = React.useMemo<ComplaintFormType>(() => {
    return {
      complaint: "",
    };
  }, []);

  const methods = useForm({
    resolver: yupResolver(ComplaintFormSchema()),
    defaultValues,
  });
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Flex direction={"column"} gap={"lg"}>
        <TextInput label="Nama" disabled value={user.name} />
        <TextInput label="Nomor Handphone" disabled value={user.phone} />
        <Input
          type="text-area"
          label="Keluhan / Kritik / Saran"
          name="complaint"
        />
        <Card withBorder bg={color.information1}>
          <Flex direction={"row"} gap={"md"}>
            <Info weight="bold" size={24} />
            <Text fw={"bold"}>Informasi!</Text>
          </Flex>
          <Text>
            Terima kasih telah memberikan keluhan anda. Hal ini akan secepatnya
            ditangani oleh pihak toko. Terima kasih
          </Text>
        </Card>
        <Center>
          <FormActionComponent />
        </Center>
      </Flex>
    </Form>
  );
}
