import { useRouter } from "next/router";
import { useCreateSparePart } from "../../../api-hooks/spare-part-api";
import { SparePartFormType } from "./component/type";
import { FileWithPath } from "@mantine/dropzone";
import SparePartForm from "./component/spare-part-form";
import React from "react";
import { uploadFile } from "../../../utils/api";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";

export default function SparePartCreate() {
  const { mutateAsync } = useCreateSparePart();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: SparePartFormType, files: FileWithPath[]) => {
      try {
        const sparePart = await mutateAsync(values);
        if (files.length) {
          await uploadFile({ id: sparePart.id, model: "spare_parts", files });
        }
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Barang Berhasil",
        });
        queryClient.invalidateQueries();
        push(`${NavigationRoutes.sparePart}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e.message}`,
        });
      }
    },
    [mutateAsync, push]
  );
  return <SparePartForm onSubmit={onSubmit} />;
}
