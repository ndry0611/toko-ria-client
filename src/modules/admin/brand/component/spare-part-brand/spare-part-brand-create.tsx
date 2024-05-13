import React from "react";
import notification from "../../../../../component/notification";
import { queryClient } from "../../../../../pages/_app";
import { modals } from "@mantine/modals";
import { useCreateSparePartBrand } from "../../../../../api-hooks/spare-part-brand-api";
import { SparePartBrandFormType } from "./spare-part-brand-type";
import SparePartBrandForm from "./spare-part-brand-form";

export default function CreateSparePartBrand() {
  const { mutateAsync } = useCreateSparePartBrand();
  const onSubmit = React.useCallback(
    async (values: SparePartBrandFormType) => {
      try {
        await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Merk Barang Berhasil",
        });
        queryClient.refetchQueries({ queryKey: ["get-spare-part-brands"] });
        modals.closeAll();
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [mutateAsync]
  );
  return <SparePartBrandForm onSubmit={onSubmit} />;
}
