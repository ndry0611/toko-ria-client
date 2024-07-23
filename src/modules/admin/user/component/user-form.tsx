import { useForm } from "react-hook-form";
import { CreateUserFormSchema, CreateUserFormType } from "./user-type";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../../../../component/form";
import TitleText from "../../../../component/title";
import { Flex, SimpleGrid, Space } from "@mantine/core";
import BackButton from "../../component/back-button";
import Input from "../../../../component/input";
import FormActionComponent from "../../component/form-action-component";
import React from "react";

interface UserFormProps {
  onSubmit: (values: CreateUserFormType) => Promise<void>;
}
export default function UserForm(props: UserFormProps) {
  const { onSubmit } = props;

  const defaultValues = React.useMemo<CreateUserFormType>(() => {
    return {
      username: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      id_role: "2",
      status: "ACTIVE",
    };
  }, []);

  const methods = useForm({
    resolver: yupResolver(CreateUserFormSchema()),
    defaultValues,
  });
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <TitleText>Tambah User</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <SimpleGrid cols={2}>
        <Flex
          direction={"column"}
          gap={20}
          style={{ margin: "20px 0px" }}
          maw={"500px"}
        >
          <Input type="text" name="username" label="Username" />
          <Input type="text" name="name" label="Nama User" />

          <Input type="text" name="address" label="Alamat User" />
        </Flex>
        <Flex
          direction={"column"}
          gap={20}
          style={{ margin: "20px 0px" }}
          maw={"500px"}
        >
          <Input type="password" name="password" label="Password" />
          <Input type="text" name="phone" label="Nomor Telepon" />
          <Input
            type="radio"
            name="id_role"
            label="Posisi"
            data={[
              { value: "1", label: "Admin" },
              { value: "3", label: "Employee" },
              { value: "2", label: "Customer" },
            ]}
          />
          <Input
            type="radio"
            name="status"
            label="Status Akun"
            data={[
              { value: "PENDING", label: "PENDING" },
              { value: "ACTIVE", label: "AKTIF" },
              { value: "INACTIVE", label: "TIDAK AKTIF" },
            ]}
          />
        </Flex>
      </SimpleGrid>
      <FormActionComponent />
    </Form>
  );
}
