import React from "react";
import {
  MultipleSpecialPriceFormSchema,
  MultipleSpecialPriceFormType,
} from "./type";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SpecialPricesFields from "./special-prices-fields";
import Form from "../../../../component/form";
import FormActionComponent from "../../component/form-action-component";
import { Space } from "@mantine/core";
import { useCreateMultipleSpecialPrice } from "../../../../api-hooks/special-price-api";
import notification from "../../../../component/notification";
import { queryClient } from "../../../../pages/_app";

interface SpecialPricesFormProps {
  closeDrawer: () => void;
}

export default function SpecialPricesForm(props: SpecialPricesFormProps) {
  const {closeDrawer} = props;
  const { query } = useRouter();
  const idSparePart = query.id as string;
  const { mutateAsync } = useCreateMultipleSpecialPrice();
  const defaultValues = React.useMemo<MultipleSpecialPriceFormType>(() => {
    return {
      id_spare_part: idSparePart,
      special_prices: [],
    };
  }, [idSparePart]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(MultipleSpecialPriceFormSchema()),
  });

  const onSubmit = React.useCallback(
    async (values: MultipleSpecialPriceFormType) => {
      try {
        await mutateAsync(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil menyimpan harga khusus",
        });
        queryClient.refetchQueries({queryKey: ["get-special-price", idSparePart]});
        closeDrawer();
      } catch (e: any) {
        notification.error({
          title: "Gagal Simpan",
          message: `${e.message}`,
        });
      }
    },
    [closeDrawer, idSparePart, mutateAsync]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <SpecialPricesFields />
      <Space h={"md"} />
      <FormActionComponent />
    </Form>
  );
}
