import { yupResolver } from "@hookform/resolvers/yup";
import {
  CarBrandFormSchema,
  CarBrandFormType,
  CarBrandModel,
} from "./car-brand-type";
import { useForm } from "react-hook-form";
import Form from "../../../../../component/form";
import Input from "../../../../../component/input";
import FormActionComponent from "../../../component/form-action-component";
import { Space } from "@mantine/core";

interface CarBrandFormProps {
  carBrand?: CarBrandModel;
  onSubmit: (values: CarBrandFormType) => Promise<void>;
}

export default function CarBrandForm(props: CarBrandFormProps) {
  const { carBrand, onSubmit } = props;
  const defaultValues: CarBrandFormType = {
    name: carBrand?.name ?? "",
    manufacture: carBrand?.manufacture ?? "",
    data: carBrand,
  };
  const methods = useForm({
    resolver: yupResolver(CarBrandFormSchema()),
    defaultValues,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!carBrand}>
      <Input type="text" label="Nama Merk" name="name" />
      <Input type="text" label="Manufaktur" name="manufacture" />
      <Space h={"sm"} />
      <FormActionComponent />
    </Form>
  );
}
