import { useRouter } from "next/router";
import { useGetSale, useUpdateSale } from "../../../../api-hooks/sale-api";
import { UpdateSaleFormType } from "./type";
import React from "react";
import notification from "../../../../component/notification";
import { NavigationRoutes } from "../../../../common/constants/route";
import LoaderView from "../../component/loader-view";
import SalesForm from "./sales-form";

export default function UpdateSale() {
  const { mutateAsync } = useUpdateSale();
  const { query, push } = useRouter();
  const id = query.id as string;
  const querySale = useGetSale(id);
  const onSubmit = React.useCallback(
    async (values: UpdateSaleFormType) => {
      try {
        await mutateAsync({ id, body: values });
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate Penjualan",
        });
        push(`${NavigationRoutes.sales}`);
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
    <LoaderView query={querySale}>
      {(sale) => <SalesForm sales={sale} onSubmit={onSubmit} />}
    </LoaderView>
  );
}
