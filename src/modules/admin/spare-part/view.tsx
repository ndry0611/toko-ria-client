import { useRouter } from "next/router";
import {
  useDeleteSparePart,
  useGetSparePart,
  useUpdateSparePart,
} from "../../../api-hooks/spare-part-api";
import LoaderView from "../component/loader-view";
import SparePartForm from "./component/spare-part-form";
import React from "react";
import { SparePartFormType } from "./component/type";

import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";
import notification from "../../../component/notification";
import { FileWithPath } from "@mantine/dropzone";
import { uploadFile } from "../../../utils/api";

export default function SparePartDetail() {
  const { query, push } = useRouter();
  const id = query.id as string;

  const querySparePart = useGetSparePart(id);
  const { mutateAsync } = useUpdateSparePart();

  const onSubmit = React.useCallback(
    async (values: SparePartFormType, files: FileWithPath[]) => {
      try {
        await mutateAsync({ id, body: values });
        if (files.length) {
          await uploadFile({ id, model: "spare_parts", files });
        }
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate spare part",
        });
        queryClient.refetchQueries();
        push(`${NavigationRoutes.sparePart}`);
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
    <LoaderView query={querySparePart}>
      {(sparePart) => (
        <SparePartForm sparePart={sparePart} onSubmit={onSubmit} />
      )}
    </LoaderView>
  );
}
