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

interface CategoryFormProps {
  category?: CategoryModel;
  onSubmit: (values: CategoryFormType) => Promise<void>;
}

export default function CategoryForm(props: CategoryFormProps) {
  const { category, onSubmit } = props;
  const defaultValues: CategoryFormType = {
    description: category?.description ?? "",
    name: category?.name ?? "",
    data: category
  };

  const methods = useForm({
    resolver: yupResolver(CategoryFormSchema()),
    defaultValues
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <TitleText>{category ? "Edit" : "Create"} Category</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <Flex direction={"column"} gap={20} style={{ margin: "20px 0px" }}>
        <Input type="text" name="name" label="Nama Kategori" required />
        <Input
          type="text"
          name="description"
          label="Deskripsi Kategori"
          required
        />
      </Flex>
      <Input type="submit" color={color.statusPositive5} />
    </Form>
  );
}
