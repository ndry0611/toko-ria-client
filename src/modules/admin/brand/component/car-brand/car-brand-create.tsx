import React from "react";
import { useCreateCarBrand } from "../../../../../api-hooks/car-brand-api";
import { CarBrandFormType } from "./car-brand-type";
import notification from "../../../../../component/notification";
import { queryClient } from "../../../../../pages/_app";
import { modals } from "@mantine/modals";
import CarBrandForm from "./car-brand-form";

export default function CreateCarBrand() {
  const { mutateAsync } = useCreateCarBrand();
  const onSubmit = React.useCallback(
    async (values: CarBrandFormType) => {
      try {
        await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Merk Mobil Berhasil",
        });
        queryClient.refetchQueries({ queryKey: ["get-car-brands"] });
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
  return <CarBrandForm onSubmit={onSubmit} />;
}
