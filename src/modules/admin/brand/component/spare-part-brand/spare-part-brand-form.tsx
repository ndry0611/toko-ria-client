import { yupResolver } from "@hookform/resolvers/yup";
import {
  SparePartBrandFormSchema,
  SparePartBrandFormType,
  SparePartBrandModel,
} from "./spare-part-brand-type";
import { useForm } from "react-hook-form";
import Form from "../../../../../component/form";
import Input from "../../../../../component/input";
import FormActionComponent from "../../../component/form-action-component";
import { Space } from "@mantine/core";

interface SparePartBrandFormProps {
  sparePartBrand?: SparePartBrandModel;
  onSubmit: (values: SparePartBrandFormType) => Promise<void>;
}

export default function SparePartBrandForm(props: SparePartBrandFormProps) {
  const { sparePartBrand, onSubmit } = props;
  const defaultValues: SparePartBrandFormType = {
    name: sparePartBrand?.name ?? "",
    manufacture: sparePartBrand?.manufacture ?? "",
    data: sparePartBrand,
  };
  const methods = useForm({
    resolver: yupResolver(SparePartBrandFormSchema()),
    defaultValues,
  });

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!sparePartBrand}
    >
      <Input type="text" label="Nama Merk" name="name" />
      <Input type="text" label="Manufaktur" name="manufacture" />
      <Space h={"sm"} />
      <FormActionComponent />
    </Form>
  );
}
