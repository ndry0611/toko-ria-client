import React from "react";
import CategoryForm from "./component/category-form";
import { CategoryModel } from "./component/type";
import notification from "../../../component/notifications";
import { useCreateCategory } from "../../../api-hooks/category-api";
import { queryClient } from "../../../pages/_app";
import { useRouter } from "next/router";
import { NavigationRoutes } from "../../../common/constants/route";

export default function CategoryCreate() {
  const { mutateAsync } = useCreateCategory();
  const { push } = useRouter();
  const onSubmit = React.useCallback(
    async (values: CategoryModel) => {
      try {
        await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Kategori Berhasil",
        });
      } catch (e: any) {
        notification.error({
          title: "Simpan Kategori Gagal",
          message: `${e?.message}`,
        });
      }
      queryClient.invalidateQueries();
      push(`${NavigationRoutes.category}`);
    },
    [mutateAsync, push]
  );
  return <CategoryForm onSubmit={onSubmit} />;
}
