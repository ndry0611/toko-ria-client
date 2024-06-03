import { useForm } from "react-hook-form";
import Form from "../../../../component/form";
import { GetSaleModel, SaleFormSchema, SaleFormType } from "./type";
import React from "react";
import SalesDetailFields from "./sales-detail-fields";
import { yupResolver } from "@hookform/resolvers/yup";
import TitleText from "../../component/title";
import { SimpleGrid, Space } from "@mantine/core";
import BackButton from "../../component/back-button";
import UserSelect from "../../select/user-select";
import Input from "../../../../component/input";
import SpecialPriceHandler from "./special-price-handler";
import FormActionComponent from "../../component/form-action-component";
import GrandTotalHandler from "./grand-total-handler";
import { color } from "../../../../common/constants/color";
import { generateCode } from "../../../../utils/string";

interface SalesFormProps {
  sales?: GetSaleModel;
  onSubmit: (values: SaleFormType) => Promise<void>;
}

export default function SalesForm(props: SalesFormProps) {
  const { sales, onSubmit } = props;
  const defaultValues: SaleFormType = {
    code: sales?.code ?? generateCode(),
    expired_date: sales
      ? sales.expired_date
        ? new Date(sales.expired_date)
        : undefined
      : undefined,
    grand_total: sales?.grand_total ?? 0,
    id_user: sales?.id_user.toString() ?? "",
    payment_date: sales
      ? sales.payment_date
        ? new Date(sales.payment_date)
        : undefined
      : new Date(),
    payment_method: sales?.payment_method.toString() ?? "1",
    status: sales?.status.toString() ?? "4",
    sale_detail:
      sales?.SaleDetail.map((item) => ({
        id_spare_part: item.id_spare_part.toString(),
        quantity: item.quantity,
        price: item.price,
        total_price: item.total_price,
        file_name: item.SparePart.file_name ?? "",
        part_no: item.SparePart.part_no,
        sell_method: item.SparePart.sell_method ?? "",
      })) ?? [],
    specialPrices: [],
    data: sales,
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(SaleFormSchema()),
  });
  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!sales}>
      <TitleText>{sales ? "Edit" : "Tambah"} Penjualan</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <SimpleGrid
        cols={3}
        mb={16}
        style={{
          paddingBottom: 16,
          borderBottom: `1px solid ${color.mainTheme}`,
        }}
      >
        <SpecialPriceHandler />
        <GrandTotalHandler />
        <UserSelect
          filtering={
            sales ? { id_role: "2" } : { id_role: "2", status: "ACTIVE" }
          }
          name="id_user"
          label="Pelanggan"
          disabled={sales ? true : false}
          placeholder="Pilih Pelanggan"
        />
        <Input
          type="text"
          name="code"
          label="Kode Bon"
          disabled
        />
        <Input
          type="select"
          name="payment_method"
          label="Metode Pembayaran"
          data={[
            { value: "1", label: "Offline" },
            { value: "2", label: "Online" },
          ]}
          disabled
        />
        <Input type="number" name="grand_total" label="Jumlah Total" disabled />
        <Input
          type="date"
          name="payment_date"
          label="Tanggal Pembayaran"
          disabled
        />
        <Input
          label="Status Penjualan"
          type="radio"
          name="status"
          readOnly={sales ? false : true}
          data={[
            {
              value: "1",
              label: "Packing",
            },
            {
              value: "2",
              label: "Dikirim",
            },
            {
              value: "3",
              label: "Dibatalkan",
            },
            {
              value: "4",
              label: "Selesai",
            },
          ]}
        />
      </SimpleGrid>
      <SalesDetailFields />
      <Space h={16} />
      <FormActionComponent />
    </Form>
  );
}
