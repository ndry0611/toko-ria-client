import { useForm } from "react-hook-form";
import { SupplierFormSchema, SupplierFormType, SupplierModel } from "./type";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../../../../component/form";
import TitleText from "../../component/title";
import { Flex, SimpleGrid, Space } from "@mantine/core";
import BackButton from "../../component/back-button";
import Input from "../../../../component/input";
import FormActionComponent from "../../component/form-action-component";

interface SupplierFormProps {
  supplier?: SupplierModel;
  onSubmit: (values: SupplierFormType) => Promise<void>;
}

export default function SupplierForm(props: SupplierFormProps) {
  const { supplier, onSubmit } = props;
  const defaultValues: SupplierFormType = {
    company_name: supplier?.company_name ?? "",
    company_phone: supplier?.company_phone ?? "",
    pic_name: supplier?.pic_name ?? "",
    pic_phone: supplier?.pic_phone ?? "",
    address: supplier?.address ?? "",
    bank_account: supplier?.bank_account ?? "",
    bank_account_name: supplier?.bank_account_name ?? "",
    status: supplier?.status ?? "ACTIVE",
    data: supplier,
  };
  const methods = useForm({
    resolver: yupResolver(SupplierFormSchema()),
    defaultValues,
  });
  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!supplier}>
      <TitleText>{supplier ? "Edit" : "Tambah"} Supplier</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <SimpleGrid cols={3} mb={16}>
        <Flex
          direction={"column"}
          gap={20}
          style={{ margin: "20px 0px" }}
          maw={"500px"}
        >
          <Input type="text" name="company_name" label="Nama Perusahaan" />
          <Input type="text" name="company_phone" label="Telepon Perusahaan" />
          <Input type="text" name="pic_name" label="Nama Penanggung Jawab" />
          <Input
            type="text"
            name="pic_phone"
            label="Telepon Penanggung Jawab"
          />
        </Flex>
        <Flex
          direction={"column"}
          gap={20}
          style={{ margin: "20px 0px" }}
          maw={"500px"}
        >
          <Input type="text-area" name="address" label="Alamat" />
          <Input
            type="text"
            name="bank_account"
            label="Rekening"
            placeholder="(BANK) Nomor Rekening"
          />
          <Input type="text" name="bank_account_name" label="Nama Rekening" />
          <Input
            type="radio"
            name="status"
            label="Status Supplier"
            data={[
              { value: "ACTIVE", label: "AKTIF" },
              { value: "INACTIVE", label: "TIDAK AKTIF" },
            ]}
          />
        </Flex>
      </SimpleGrid>
      <FormActionComponent />
    </Form>
  );
}
