import { useRouter } from "next/router";
import {
  useGetCategory,
  useUpdateCategory,
} from "../../../../api-hooks/category-api";
import LoaderView from "../../component/loader-view";
import CategoryForm from "./category-form";
import React from "react";
import { CategoryFormType } from "./type";
import notification from "../../../../component/notifications";
import { queryClient } from "../../../../pages/_app";
import { NavigationRoutes } from "../../../../common/constants/route";

export default function CategoryDetail() {
  const { query, push } = useRouter();
  const id = query.id as string;

  const queryCategory = useGetCategory(id);
  const { mutateAsync } = useUpdateCategory();

  const onSubmit = React.useCallback(async (values: CategoryFormType) => {
    try {
      await mutateAsync({ id, body: values });
      notification.success({
        title: "Simpan Berhasil",
        message: "Berhasil mengupdate kategori",
      });
      queryClient.refetchQueries();
      push(`${NavigationRoutes.category}`);
    } catch (e: any) {
      notification.error({
        title: "Simpan Gagal",
        message: `${e?.message}`,
      });
    }
  }, [id, mutateAsync, push]);

  return (
    <LoaderView query={queryCategory}>
      {(category) => <CategoryForm category={category} onSubmit={onSubmit} />}
    </LoaderView>
  );
}
