import { useRouter } from "next/router";
import {
  useGetSupplier,
  useUpdateSupplier,
} from "../../../api-hooks/supplier-api";
import React from "react";
import { SupplierFormType } from "./component/type";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";
import LoaderView from "../component/loader-view";
import SupplierForm from "./component/supplier-form";

export default function SupplierDetail() {
  const { query, push } = useRouter();
  const id = query.id as string;
  const querySupplier = useGetSupplier(id);
  const { mutateAsync } = useUpdateSupplier();
  const onSubmit = React.useCallback(
    async (values: SupplierFormType) => {
      try {
        await mutateAsync({ id, body: values });
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate Supplier",
        });
        queryClient.refetchQueries();
        push(`${NavigationRoutes.supplier}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [id, mutateAsync, push]
  );
  return (
    <LoaderView query={querySupplier}>
      {(supplier) => <SupplierForm supplier={supplier} onSubmit={onSubmit} />}
    </LoaderView>
  );
}
