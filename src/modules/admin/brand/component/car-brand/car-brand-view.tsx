import React from "react";
import { useUpdateCarBrand } from "../../../../../api-hooks/car-brand-api";
import { CarBrandFormType, CarBrandModel } from "./car-brand-type";
import notification from "../../../../../component/notification";
import { queryClient } from "../../../../../pages/_app";
import CarBrandForm from "./car-brand-form";
import { modals } from "@mantine/modals";

export interface CarBrandViewProps {
  carBrand: CarBrandModel;
}

export default function CarBrandView(props: CarBrandViewProps) {
  const { carBrand } = props;
  const { mutateAsync } = useUpdateCarBrand();
  const onSubmit = React.useCallback(
    async (values: CarBrandFormType) => {
      try {
        await mutateAsync({ id: carBrand.id.toString(), body: values });
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate Merk Mobil",
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
    [carBrand.id, mutateAsync]
  );
  return <CarBrandForm carBrand={carBrand} onSubmit={onSubmit} />;
}
