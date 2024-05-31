import { Text } from "@mantine/core";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import { useToken } from "../../../hooks/use-token";
import { useGetMe, useUpdateUser } from "../../../api-hooks/user-api";
import LoaderView from "../../admin/component/loader-view";
import ProfileForm from "./component/profile-form";
import React from "react";
import { UpdateUserFormType } from "../../admin/user/component/user-type";
import { FileWithPath } from "@mantine/dropzone";
import { uploadUserPhoto } from "../../../utils/api";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { useRouter } from "next/router";
import { NavigationRoutes } from "../../../common/constants/route";

export default function ProfileDetail() {
  const { token } = useToken();
  const { push } = useRouter();
  const query = useGetMe();
  const { data } = query;
  const { mutateAsync } = useUpdateUser();
  const onSubmit = React.useCallback(
    async (values: UpdateUserFormType, files: FileWithPath[]) => {
      try {
        if (data) {
          await mutateAsync({ id: data.id.toString(), body: values });
          if (files.length) {
            await uploadUserPhoto(files);
          }
          notification.success({
            title: "Simpan Berhasil",
            message: "Berhasil mengupdate Data diri",
          });
          queryClient.refetchQueries();
          push(`${NavigationRoutes.profile}`);
        } else {
          throw new Error("User not found!");
        }
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [data, mutateAsync, push]
  );

  return (
    <PhoneLayout
      back
      centerComponent={<Text fw={700}>Edit Profil</Text>}
      // bottomContainer={<NavigationBar />}
    >
      <LoaderView query={query}>
        {(data) => <ProfileForm user={data} onSubmit={onSubmit} />}
      </LoaderView>
    </PhoneLayout>
  );
}
