import React from "react";
import { useGetMe } from "../../api-hooks/user-api";
import {
  ComplaintFormType,
  useCreateComplaint,
} from "../../api-hooks/complaint-api";
import notification from "../../component/notification";
import { useRouter } from "next/router";
import { NavigationRoutes } from "../../common/constants/route";
import PhoneLayout from "../../component/phone-layout/phone-layout";
import LoaderView from "../admin/component/loader-view";
import ComplaintForm from "./component/complaint-form";
import { Text } from "@mantine/core";

export default function ComplaintPage() {
  const query = useGetMe();
  const { data } = query;
  const { mutateAsync } = useCreateComplaint();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: ComplaintFormType) => {
      try {
        await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil menambah komplain",
        });
        push(`${NavigationRoutes.profile}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [mutateAsync, push]
  );
  return (
    <PhoneLayout back centerComponent={<Text fw={700}>Ajukan Keluhan</Text>}>
      <LoaderView query={query}>
        {(data) => <ComplaintForm user={data} onSubmit={onSubmit} />}
      </LoaderView>
    </PhoneLayout>
  );
}
