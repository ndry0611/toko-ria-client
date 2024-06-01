import React from "react";
import { useUpdateUser } from "../../../../api-hooks/user-api";
import { GetUserModel, UpdateUserFormType } from "./user-type";
import notification from "../../../../component/notification";
import { queryClient } from "../../../../pages/_app";
import { modals } from "@mantine/modals";
import CustomerStatusForm from "./customer-status-form";

export interface CustomerStatusViewProps {
  user: GetUserModel;
}

export default function CustomerStatusView(props: CustomerStatusViewProps) {
  const { user } = props;
  const { mutateAsync } = useUpdateUser();
  const onSubmit = React.useCallback(
    async (values: UpdateUserFormType) => {
      try {
        await mutateAsync({ id: user.id.toString(), body: values });
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate Status Pelanggan",
        });
        queryClient.refetchQueries({ queryKey: ["get-users"] });
        modals.closeAll();
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [mutateAsync, user.id]
  );
  return <CustomerStatusForm user={user} onSubmit={onSubmit} />;
}
