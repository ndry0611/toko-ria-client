import { useRouter } from "next/router";
import PurchaseForm from "./component/purchase-form";
import { useCreatePurchase } from "../../../api-hooks/purchase-api";
import { PurchaseFormType } from "./component/type";
import React from "react";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";

export default function CreatePurchase() {
  const { mutateAsync } = useCreatePurchase();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: PurchaseFormType) => {
      try {
        const purchase = await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Pembelian Berhasil",
        });
        queryClient.invalidateQueries();
        push(`${NavigationRoutes.purchase}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [mutateAsync, push]
  );
  return <PurchaseForm onSubmit={onSubmit} />;
}
