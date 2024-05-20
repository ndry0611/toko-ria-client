import { useRouter } from "next/router";
import PurchaseForm from "./component/purchase-form";
import {
  useCreatePurchase,
  useGetPurchase,
  useUpdatePurchase,
} from "../../../api-hooks/purchase-api";
import { UpdatePurchaseFormType } from "./component/type";
import React from "react";
import notification from "../../../component/notification";
import { NavigationRoutes } from "../../../common/constants/route";
import LoaderView from "../component/loader-view";

export default function UpdatePurchase() {
  const { mutateAsync } = useUpdatePurchase();
  const { query, push } = useRouter();
  const id = query.id as string;
  const queryPurchase = useGetPurchase(id);
  const onSubmit = React.useCallback(
    async (values: UpdatePurchaseFormType) => {
      try {
        await mutateAsync({ id, body: values });
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate Pembelian",
        });
        push(`${NavigationRoutes.purchase}`);
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
    <LoaderView query={queryPurchase}>
      {(purchase) => <PurchaseForm purchase={purchase} onSubmit={onSubmit} />}
    </LoaderView>
  );
}
