import { yupResolver } from "@hookform/resolvers/yup";
import { CarFormSchema, CarFormType, GetCarModel } from "./type";
import { useForm } from "react-hook-form";
import React from "react";
import Form from "../../../../component/form";
import TitleText from "../../../../component/title";
import { Flex, Space } from "@mantine/core";
import BackButton from "../../component/back-button";
import Input from "../../../../component/input";
import CarBrandSelect from "../../select/car-brand-select";
import FormActionComponent from "../../component/form-action-component";

interface CarFormProps {
  car?: GetCarModel;
  onSubmit: (values: CarFormType) => Promise<void>;
}

export default function CarForm(props: CarFormProps) {
  const { car, onSubmit } = props;

  const defaultValues = React.useMemo<CarFormType>(() => {
    return {
      id_car_brand: car?.id_car_brand?.toString() ?? "",
      name: car?.name ?? "",
      production_year: car?.production_year ?? "",
      type: car?.type ?? "",
      data: car,
    };
  }, [car]);

  const methods = useForm({
    resolver: yupResolver(CarFormSchema()),
    defaultValues,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!car}>
      <TitleText>{car ? "Edit" : "Tambah"} Mobil</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <Flex
        direction={"column"}
        gap={20}
        style={{ margin: "20px 0px" }}
        maw={"500px"}
      >
        <Input type="text" name="name" label="Nama Mobil" />
        <CarBrandSelect
          name="id_car_brand"
          label="Merk Mobil"
          placeholder="Pilih Merk Mobil"
        />
        <Input type="text" name="type" label="Tipe Mobil" />
        <Input type="text" name="production_year" label="Tahun Produksi" />
      </Flex>
      <FormActionComponent />
    </Form>
  );
}
