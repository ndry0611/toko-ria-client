import { useRouter } from "next/router";
import { useGetSale, useUpdateSale } from "../../../api-hooks/sale-api";
import { UpdateSaleFormType } from "./components/type";
import React from "react";
import notification from "../../../component/notification";
import { NavigationRoutes } from "../../../common/constants/route";
import LoaderView from "../component/loader-view";
import SalesForm from "./components/sales-form";
import { Space } from "@mantine/core";
import SalePaper from "../../../component/sales-paper";
import { useReactToPrint } from "react-to-print";
import PrintButton from "../component/print-button";

export default function UpdateSale() {
  const { mutateAsync } = useUpdateSale();
  const { query, push } = useRouter();
  const id = query.id as string;
  const querySale = useGetSale(id);

  const componentRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const onSubmit = React.useCallback(
    async (values: UpdateSaleFormType) => {
      try {
        await mutateAsync({ id, body: values });
        notification.success({
          title: "Simpan Berhasil",
          message: "Berhasil mengupdate Penjualan",
        });
        push(`${NavigationRoutes.sales}`);
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
    <LoaderView query={querySale}>
      {(sale) => (
        <>
          <SalesForm sales={sale} onSubmit={onSubmit} />
          <Space h={"sm"} />
          <PrintButton
            component={<SalePaper ref={componentRef} sale={sale} />}
            onPrint={handlePrint}
          />
        </>
      )}
    </LoaderView>
  );
}
