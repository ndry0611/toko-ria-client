import { useRouter } from "next/router";
import {
  useGetCar,
  useUpdateCar,
} from "../../../api-hooks/car-api";
import CarForm from "./component/car-form";
import { CarFormType } from "./component/type";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";
import React from "react";
import LoaderView from "../component/loader-view";

export default function CarDetail() {
  const { query, push } = useRouter();
  const id = query.id as string;

  const queryCar = useGetCar(id);
  const { mutateAsync } = useUpdateCar();

  const onSubmit = React.useCallback(
    async (values: CarFormType) => {
      try {
        await mutateAsync({ id, body: values });
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate Mobil",
        });
        queryClient.refetchQueries();
        push(`${NavigationRoutes.car}`);
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
    <LoaderView query={queryCar}>
      {(car) => <CarForm car={car} onSubmit={onSubmit} />}
    </LoaderView>
  );
}
