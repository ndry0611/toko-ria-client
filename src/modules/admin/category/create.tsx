import React from "react";
import CategoryForm from "./component/category-form";
import { CategoryFormType, CategoryModel } from "./component/type";
import notification from "../../../component/notification";
import { useCreateCategory } from "../../../api-hooks/category-api";
import { queryClient } from "../../../pages/_app";
import { useRouter } from "next/router";
import { NavigationRoutes } from "../../../common/constants/route";
import { FileWithPath } from "@mantine/dropzone";
import { uploadFile } from "../../../utils/api";

export default function CategoryCreate() {
  const { mutateAsync } = useCreateCategory();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: CategoryFormType, files: FileWithPath[]) => {
      try {
        const category = await mutateAsync(values);
        if(files.length){
          await uploadFile({id: category.id, model: "categories", files})
        }
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Kategori Berhasil",
        });
        queryClient.invalidateQueries();
        push(`${NavigationRoutes.category}`);
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [mutateAsync, push]
  );
  return <CategoryForm onSubmit={onSubmit} />;
}