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
import { useGetCategories } from "../../../../api-hooks/category-api";

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
    id_car: sparePart?.id_car,
    id_supplier: sparePart?.id_supplier,
    name: sparePart?.name ?? "",
    part_no: sparePart?.part_no ?? "",
    genuine: sparePart?.genuine ?? true,
    stock: sparePart?.stock ?? 0,
    capital_price: sparePart?.capital_price ?? 0,
    sell_method: sparePart?.sell_method ?? 0,
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

  const query = useGetCategories();
  const { data = [] } = query;
  const categories = data.map((obj) => ({ value: obj.id.toString(), label: obj.name }));

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!sparePart}>
      <TitleText>{sparePart ? "Edit" : "Tambah"} Spare Part</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <SimpleGrid cols={3}>
        <Flex direction={"column"} gap={20} style={{ margin: "20px 0px" }}>
          <PhotoInput
            label="Gambar"
            onDrop={setFiles}
            files={files}
            defaultImage={defaultImage}
          />
          <Input type="select" name="id_category" data={categories} />
        </Flex>
      </SimpleGrid>
      <FormActionComponent />
    </Form>
  );
}
