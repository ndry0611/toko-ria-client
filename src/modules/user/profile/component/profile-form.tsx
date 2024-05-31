import { FileWithPath } from "@mantine/dropzone";
import {
  GetUserModel,
  UpdateUserFormSchema,
  UpdateUserFormType,
} from "../../../admin/user/component/user-type";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PublicImageRoutes } from "../../../../common/constants/route";
import Form from "../../../../component/form";
import { Center, Flex } from "@mantine/core";
import PhotoInput from "../../../../component/photo-input";
import TitleText from "../../../admin/component/title";
import Input from "../../../../component/input";
import FormActionComponent from "../../../admin/component/form-action-component";

interface ProfileFormProps {
  user: GetUserModel;
  onSubmit: (
    values: UpdateUserFormType,
    files: FileWithPath[]
  ) => Promise<void>;
}

export default function ProfileForm(props: ProfileFormProps) {
  const { user } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const defaultValues: UpdateUserFormType = {
    name: user.name,
    phone: user.phone,
    address: user.address,
    data: user,
  };
  const methods = useForm({
    resolver: yupResolver(UpdateUserFormSchema()),
    defaultValues,
  });
  const onSubmit = React.useCallback(
    async (values: UpdateUserFormType) => {
      await props.onSubmit(values, files);
    },
    [files, props]
  );
  const defaultImage = user.file_name
    ? `${PublicImageRoutes.users}${user.file_name}`
    : undefined;

  return (
    <Flex direction={"column"}>
      <Form methods={methods} onSubmit={onSubmit} defaultEditable={!user}>
        <Center>
          <PhotoInput
            onDrop={setFiles}
            files={files}
            defaultImage={defaultImage}
          />
        </Center>
        <TitleText ta={"center"}>{user.username}</TitleText>
        <Flex direction={"column"} gap={"md"}>
          <Input type="text" label="Nama" name="name" />
          <Input type="text" label="Nomor Handphone" name="phone" />
          <Input type="text-area" label="Alamat" name="address" />
          <Center>
            <FormActionComponent />
          </Center>
        </Flex>
      </Form>
    </Flex>
  );
}
