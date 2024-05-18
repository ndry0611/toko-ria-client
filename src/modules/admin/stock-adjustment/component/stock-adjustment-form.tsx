import { useForm } from "react-hook-form";
import {
  GetStockAdjustmentModel,
  StockAdjustmentFormType,
  StockAdjustmentSchema,
} from "./type";
import { yupResolver } from "@hookform/resolvers/yup";
import TitleText from "../../component/title";
import Form from "../../../../component/form";
import { Flex, Space } from "@mantine/core";
import BackButton from "../../component/back-button";
import SparePartSelect from "../../select/spare-part-select";
import Input from "../../../../component/input";
import FormActionComponent from "../../component/form-action-component";

interface StockAdjustmentProps {
  stockAdjustment?: GetStockAdjustmentModel;
  onSubmit: (values: StockAdjustmentFormType) => Promise<void>;
}

export default function StockAdjustmentForm(props: StockAdjustmentProps) {
  const { stockAdjustment, onSubmit } = props;

  const defaultValues: StockAdjustmentFormType = {
    id_spare_part: stockAdjustment?.id_spare_part?.toString() ?? "",
    code: stockAdjustment?.code ?? "",
    old_quantity: stockAdjustment?.old_quantity ?? 0,
    new_quantity: stockAdjustment?.new_quantity ?? 0,
    description: stockAdjustment?.description ?? "",
    data: stockAdjustment,
  };
  const methods = useForm({
    resolver: yupResolver(StockAdjustmentSchema()),
    defaultValues,
  });

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!stockAdjustment}
    >
      <TitleText>Tambah Penyesuaian Stock</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <Flex direction={"column"} maw={"500px"} gap={15}>
        <SparePartSelect
          name="id_spare_part"
          label="Barang"
          onAfterChange={(value) => {
            methods.setValue("old_quantity", value?.item.stock ?? 0);
          }}
        />
        <Input type="text" name="code" label="Kode Faktur" />
        <Input
          type="number"
          name="old_quantity"
          label="Quantity Lama"
          disabled
        />
        <Input type="number" name="new_quantity" label="Quantity Baru" />
        <Input type="text-area" name="description" label="Alasan Penyesuaian" />
      </Flex>
      <Space h={"sm"} />
      <FormActionComponent />
    </Form>
  );
}
