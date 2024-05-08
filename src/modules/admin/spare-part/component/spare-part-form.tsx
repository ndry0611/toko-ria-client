import { FileWithPath } from "@mantine/dropzone";
import {
  SparePartFormType,
  GetSparePartModel,
  SparePartFormSchema,
} from "./type";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PublicImageRoutes } from "../../../../common/constants/route";
import Form from "../../../../component/form";
import TitleText from "../../component/title";
import { Flex, SimpleGrid, Space } from "@mantine/core";
import BackButton from "../../component/back-button";
import PhotoInput from "../../../../component/photo-input";
import Input from "../../../../component/input";
import FormActionComponent from "../../component/form-action-component";
import CategorySelect from "../../select/category-select";
import CarSelect from "../../select/car-select";
import SparePartBrandSelect from "../../select/spare-part-brand-select";

interface SparePartFormProps {
  sparePart?: GetSparePartModel;
  onSubmit: (values: SparePartFormType, files: FileWithPath[]) => Promise<void>;
}

export default function SparePartForm(props: SparePartFormProps) {
  const { sparePart } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues: SparePartFormType = {
    id_category: sparePart?.id_category ?? 0,
    id_spare_part_brand: sparePart?.id_spare_part_brand ?? 0,
    id_car: sparePart?.id_car ?? undefined,
    id_supplier: sparePart?.id_supplier ?? undefined,
    name: sparePart?.name ?? "",
    part_no: sparePart?.part_no ?? "",
    genuine: sparePart?.genuine ?? "true",
    stock: sparePart?.stock ?? 0,
    capital_price: sparePart?.capital_price ?? 0,
    sell_method: sparePart?.sell_method ?? "1",
    is_available: sparePart?.is_available ?? false,
    sale_price: sparePart?.sale_price ?? 0,
    description: sparePart?.description ?? "",
    supply_date: sparePart?.supply_date ?? "",
    data: sparePart,
  };

  const methods = useForm({
    resolver: yupResolver(SparePartFormSchema()),
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: SparePartFormType) => {
      await props.onSubmit(values, files);
    },
    [files, props]
  );

  const defaultImage = sparePart?.file_name
    ? `${PublicImageRoutes.spareParts}${sparePart.file_name}`
    : undefined;

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!sparePart}>
      <TitleText>{sparePart ? "Edit" : "Tambah"} Spare Part</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <SimpleGrid cols={3}>
        <Flex
          direction={"column"}
          gap={10}
          style={{ margin: "20px 10px 20px 0px" }}
        >
          <PhotoInput
            label="Gambar"
            onDrop={setFiles}
            files={files}
            defaultImage={defaultImage}
          />
          <CategorySelect label="Kategori" name="id_category" />
          <Input type="text" label="Part Number" name="part_no" />
          <Input type="number" label="Harga Modal" name="capital_price" />
          <Input type="check-box" label="Barang Dijual?" name="is_available" />
        </Flex>
        <Flex
          direction={"column"}
          gap={10}
          style={{ margin: "20px 10px 20px 0px" }}
        >
          <Input type="text" label="Nama Barang" name="name" />
          <Input type="text-area" label="Deskripsi Barang" name="description" />
          <SparePartBrandSelect
            label="Merk Barang"
            name="id_spare_part_brand"
          />
          <CarSelect label="Mobil" name="id_car" />
          <Input type="number" label="Stok" name="stock" />
          <Input type="number" label="Harga Jual" name="sale_price" />
          <Flex direction={"row"}>
            <Input
              type="radio"
              label="Tipe"
              name="genuine"
              data={[
                { value: "true", label: "Asli" },
                { value: "false", label: "Replika" },
              ]}
            />
            <Input
              type="radio"
              label="Metode Jual"
              name="sell_method"
              data={[
                { value: "0", label: "/pcs" },
                { value: "1", label: "/set" },
              ]}
            />
          </Flex>
        </Flex>
      </SimpleGrid>
      <FormActionComponent />
    </Form>
  );
}
