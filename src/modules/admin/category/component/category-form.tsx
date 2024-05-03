import { useForm } from "react-hook-form";
import Form from "../../../../component/form";
import TitleText from "../../component/title";
import BackButton from "../../component/back-button";
import { Flex, Space } from "@mantine/core";
import Input from "../../../../component/input";
import { color } from "../../../../common/constants/color";
import { CategoryModel, CategoryFormSchema, CategoryFormType } from "./type";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import PhotoInput from "../../../../component/photo-input";
import { FileWithPath } from "@mantine/dropzone";
import FormActionComponent from "../../component/form-action-component";
import { PublicImageRoutes } from "../../../../common/constants/route";

interface CategoryFormProps {
  category?: CategoryModel;
  onSubmit: (values: CategoryFormType, files: FileWithPath[]) => Promise<void>;
}

export default function CategoryForm(props: CategoryFormProps) {
  const { category } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues: CategoryFormType = {
    description: category?.description ?? "",
    name: category?.name ?? "",
    data: category,
  };

  const methods = useForm({
    resolver: yupResolver(CategoryFormSchema()),
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: CategoryFormType) => {
      await props.onSubmit(values, files);
    },
    [files, props]
  );

  const defaultImage = category?.file_name ? `${PublicImageRoutes.categories}${category.file_name}` : undefined

  return (
      <Form methods={methods} onSubmit={onSubmit} defaultEditable={!category}>
        <TitleText>{category ? "Edit" : "Create"} Category</TitleText>
        <Space h={"sm"} />
        <BackButton />
        <Space h={"sm"} />
        <PhotoInput label="Gambar" onDrop={setFiles} files={files} defaultImage={defaultImage}/>
        <Flex direction={"column"} gap={20} style={{ margin: "20px 0px" }} maw={"500px"}>
          <Input type="text" name="name" label="Nama Kategori" required />
          <Input
            type="text"
            name="description"
            label="Deskripsi Kategori"
            required
          />
        </Flex>
        <FormActionComponent />
      </Form>
  );
}
