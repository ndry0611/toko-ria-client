import { useRouter } from "next/router";
import { useCreateSupplier } from "../../../api-hooks/supplier-api";
import React from "react";
import { SupplierFormType } from "./component/type";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";
import SupplierForm from "./component/supplier-form";

export default function CreateSupplier() {
  const { mutateAsync } = useCreateSupplier();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: SupplierFormType) => {
      try {
        await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Supplier Berhasil",
        });
        queryClient.invalidateQueries();
        push(`${NavigationRoutes.supplier}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [mutateAsync, push]
  );
  return <SupplierForm onSubmit={onSubmit} />;
}
