import React from "react";
import notification from "../../../../../component/notification";
import { queryClient } from "../../../../../pages/_app";
import { modals } from "@mantine/modals";
import { SparePartBrandFormType, SparePartBrandModel } from "./spare-part-brand-type";
import { useUpdateSparePartBrand } from "../../../../../api-hooks/spare-part-brand-api";
import SparePartBrandForm from "./spare-part-brand-form";

export interface SparePartBrandViewProps {
  sparePartBrand: SparePartBrandModel;
}

export default function SparePartBrandView(props: SparePartBrandViewProps) {
  const { sparePartBrand } = props;
  const { mutateAsync } = useUpdateSparePartBrand();
  const onSubmit = React.useCallback(
    async (values: SparePartBrandFormType) => {
      try {
        await mutateAsync({ id: sparePartBrand.id.toString(), body: values });
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate Merk Barang",
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
    [sparePartBrand.id, mutateAsync]
  );
  return <SparePartBrandForm sparePartBrand={sparePartBrand} onSubmit={onSubmit} />;
}
