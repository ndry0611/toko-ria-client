import { useRouter } from "next/router";
import { useCreateSale } from "../../../api-hooks/sale-api";
import { SaleFormType } from "./components/type";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";
import SalesForm from "./components/sales-form";
import React from "react";

export default function CreateSale() {
  const { mutateAsync } = useCreateSale();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: SaleFormType) => { 
      try {
        const sale = await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Penjualan Berhasil",
        });
        queryClient.invalidateQueries();
        push(`${NavigationRoutes.sales}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [mutateAsync, push]
  );
  return <SalesForm onSubmit={onSubmit} />;
}
