import React from "react";
import UserForm from "./component/user-form";
import { CreateUserFormType } from "./component/user-type";
import { useCreateUser } from "../../../api-hooks/user-api";
import { useRouter } from "next/router";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";

export default function CreateUser() {
  const { mutateAsync } = useCreateUser();
  const { push } = useRouter();
  const onSubmit = React.useCallback(async (values: CreateUserFormType) => {
    try {
      const user = await mutateAsync(values);
      notification.success({
        title: "Simpan Berhasil",
        message: "Simpan User Berhasil",
      });
      queryClient.invalidateQueries();
      push(`${NavigationRoutes.user}`);
    } catch (e: any) {
      notification.error({
        title: "Simpan Gagal",
        message: `${e?.message}`,
      });
    }
  }, [mutateAsync, push]);
  return <UserForm onSubmit={onSubmit} />;
}
