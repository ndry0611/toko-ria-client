import { useRouter } from "next/router";
import {
  useGetCategory,
  useUpdateCategory,
} from "../../../api-hooks/category-api";
import LoaderView from "../component/loader-view";
import CategoryForm from "./component/category-form";
import React from "react";
import { CategoryFormType } from "./component/type";

import { queryClient } from "../../../pages/_app";
import { NavigationRoutes } from "../../../common/constants/route";
import notification from "../../../component/notification";
import { FileWithPath } from "@mantine/dropzone";

export default function CategoryDetail() {
  const { query, push } = useRouter();
  const id = query.id as string;

  const queryCategory = useGetCategory(id);
  const { mutateAsync } = useUpdateCategory();

  const onSubmit = React.useCallback(async (values: CategoryFormType,files:FileWithPath[]) => {
    try {
      await mutateAsync({ id, body: values });
      notification.success({
        title: "Simpan Berhasil",
        message: "Berhasil mengupdate kategori",
      });
      if(files.length){
        //do something
      }
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
