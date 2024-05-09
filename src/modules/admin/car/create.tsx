import { useRouter } from "next/router";
import { useCreateCar } from "../../../api-hooks/car-api";
import CarForm from "./component/car-form";
import { CarFormType } from "./component/type";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";
import React from "react";

export default function CreateCar() {
  const { mutateAsync } = useCreateCar();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: CarFormType) => {
      try {
        const car = await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Mobil Berhasil",
        });
        queryClient.invalidateQueries();
        push(`${NavigationRoutes.car}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [mutateAsync, push]
  );
  return <CarForm onSubmit={onSubmit} />;
}
