import { useForm } from "react-hook-form";
import {
  ChangePasswordFormSchema,
  ChangePasswordFormType,
  GetUserModel,
} from "../../admin/user/component/user-type";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../../../component/form";
import { Center, Flex } from "@mantine/core";
import { PhotoPreview } from "../../../component/photo-input";
import { User } from "@phosphor-icons/react";
import { PublicImageRoutes } from "../../../common/constants/route";
import TitleText from "../../../component/title";
import Input from "../../../component/input";
import FormActionComponent from "../../admin/component/form-action-component";
import React from "react";

interface ChangePasswordFormProps {
  user: GetUserModel;
  onSubmit: (values: ChangePasswordFormType) => Promise<void>;
}

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { user, onSubmit } = props;
  const defaultValues = React.useMemo<ChangePasswordFormType>(() => {
    return {
      old_password: "",
      new_password: "",
      np_confirmation: "",
    };
  }, []);

  const methods = useForm({
    resolver: yupResolver(ChangePasswordFormSchema()),
    defaultValues,
  });
  return (
    <Flex direction={"column"}>
      <Form methods={methods} onSubmit={onSubmit}>
        <Center>
          {!!user.file_name ? (
            <PhotoPreview
              imageUrl={`${PublicImageRoutes.users}${user.file_name}`}
            />
          ) : (
            <User size={128} />
          )}
        </Center>
        <TitleText ta="center">{user.username}</TitleText>
        <Flex direction={"column"} gap={"md"}>
          <Input type="password" label="Password lama" name="old_password" />
          <Input type="password" label="Password Baru" name="new_password" />
          <Input
            type="password"
            label="Konfirmasi Password Baru"
            name="np_confirmation"
          />
          <Center>
            <FormActionComponent />
          </Center>
        </Flex>
      </Form>
    </Flex>
  );
}
