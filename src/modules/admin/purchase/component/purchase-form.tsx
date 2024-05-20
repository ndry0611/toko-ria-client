import { useForm } from "react-hook-form";
import { GetPurchaseModel, PurchaseFormSchema, PurchaseFormType } from "./type";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../../../../component/form";
import TitleText from "../../component/title";
import { SimpleGrid, Space, Text } from "@mantine/core";
import BackButton from "../../component/back-button";
import GrandTotalHandler from "./grand-total-handler";
import SupplierSelect from "../../select/supplier-select";
import Input from "../../../../component/input";
import { color } from "../../../../common/constants/color";
import PurchasesDetailFields from "./purchase-detail-fields";
import FormActionComponent from "../../component/form-action-component";

interface PurchaseFormProps {
  purchase?: GetPurchaseModel;
  onSubmit: (values: PurchaseFormType) => Promise<void>;
}

export default function PurchaseForm(props: PurchaseFormProps) {
  const { purchase, onSubmit } = props;
  const defaultValues: PurchaseFormType = {
    id_supplier: purchase?.id_supplier.toString() ?? "",
    code: purchase?.code ?? "",
    purchase_date: purchase?.purchase_date
      ? new Date(purchase.purchase_date)
      : new Date(),
    credit_duration: purchase?.credit_duration ?? 0,
    grand_total: purchase?.grand_total ?? 0,
    status: purchase?.status.toString() ?? "",
    payment_date: purchase
      ? purchase.payment_date
        ? new Date(purchase.payment_date)
        : undefined
      : undefined,
    purchase_detail:
      purchase?.PurchaseDetail.map((item) => ({
        id_spare_part: item.id_spare_part.toString(),
        quantity: item.quantity,
        price: item.price,
        total_price: item.total_price,
        file_name: item.SparePart.file_name ?? "",
        part_no: item.SparePart.part_no,
        discount: item.discount,
        sell_method: item.SparePart.sell_method ?? "",
      })) ?? [],
    data: purchase,
    specialPrices: [],
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(PurchaseFormSchema()),
  });
  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!purchase}>
      <TitleText>{purchase ? "Edit" : "Tambah"} Pembelian</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <GrandTotalHandler />
      <SimpleGrid
        cols={3}
        mb={16}
        style={{
          paddingBottom: 16,
          borderBottom: `1px solid ${color.mainTheme}`,
        }}
      >
        <SupplierSelect
          name="id_supplier"
          label="Supplier"
          disabled={purchase ? true : false}
        />
        <Input type="text" name="code" label="Kode Bon" />
        <Input type="date" name="purchase_date" label="Tanggal Bon" />
        <Input type="number" name="grand_total" label="Jumlah Total" disabled />
        <Input
          type="date"
          name="payment_date"
          label="Tanggal Pembayaran"
          disabled={purchase?.payment_date ? true : false}
        />
        <Input
          type="number"
          name="credit_duration"
          label="Lama Kredit"
          rightSection={<Text mr={16}>Hari</Text>}
        />
        <Input
          label="Status Pembelian"
          type="radio"
          name="status"
          data={[
            {
              value: "1",
              label: "Aktif",
            },
            {
              value: "2",
              label: "Selesai",
            },
            {
              value: "3",
              label: "Dibatalkan",
            },
          ]}
        />
      </SimpleGrid>
      <PurchasesDetailFields />
      <Space h={16} />
      <FormActionComponent />
    </Form>
  );
}
