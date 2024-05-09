import { useRouter } from "next/router";
import { useCreateStockAdjustment } from "../../../api-hooks/stock-adjustment-api";
import { StockAdjustmentFormType } from "./component/type";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";
import React from "react";
import StockAdjustmentForm from "./component/stock-adjustment-form";

export default function CreateStockAdjustment() {
  const { mutateAsync } = useCreateStockAdjustment();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: StockAdjustmentFormType) => {
      try {
        const stockAdjustment = await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil menyesuaikan stok barang",
        });
        queryClient.invalidateQueries();
        push(`${NavigationRoutes.stockAdjustment}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`
        });
      }
    },
    [mutateAsync, push]
  );
  return <StockAdjustmentForm onSubmit={onSubmit}/>
}
