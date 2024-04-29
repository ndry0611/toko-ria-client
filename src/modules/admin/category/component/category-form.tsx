import { useForm } from "react-hook-form";
import Form from "../../../../component/form";
import TitleText from "../../component/title";
import BackButton from "../../component/back-button";
import { Flex, Space } from "@mantine/core";
import Input from "../../../../component/input";
import { color } from "../../../../common/constants/color";

export default function CategoryForm() {
  const methods = useForm();

  return (
    <Form methods={methods} onSubmit={() => {}} defaultEditable>
      <TitleText>Create Category</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <Flex direction={"column"} gap={20} style={{margin: "20px 0px"}}>
        <Input type="text" name="name" label="Nama Kategori" required />
        <Input type="text" name="deskripsi" label="Deskripsi Kategori" required />
      </Flex>
      <Input type="submit" color={color.statusPositive5}/>
    </Form>
  );
}
