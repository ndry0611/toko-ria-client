import React from "react";
import { useChangePassword, useGetMe } from "../../../api-hooks/user-api";
import { ChangePasswordFormType } from "../../admin/user/component/user-type";
import notification from "../../../component/notification";
import { useToken } from "../../../hooks/use-token";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import LoaderView from "../../admin/component/loader-view";
import ChangePasswordForm from "./component/change-password-form";

export default function ChangePasswordPage() {
  const query = useGetMe();
  const { data } = query;
  const { handleLogout } = useToken();
  const { mutateAsync } = useChangePassword();
  const onSubmit = React.useCallback(
    async (values: ChangePasswordFormType) => {
      try {
        await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengganti Password",
        });
        handleLogout();
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [handleLogout, mutateAsync]
  );
  return (
    <PhoneLayout>
      <LoaderView query={query}>
        {(data) => <ChangePasswordForm user={data} onSubmit={onSubmit} />}
      </LoaderView>
    </PhoneLayout>
  );
}
