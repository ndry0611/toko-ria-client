import { FileWithPath } from "@mantine/dropzone";
import {
  SparePartFormType,
  GetSparePartModel,
  SparePartFormSchema,
  SparePartModel,
} from "./type";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  NavigationRoutes,
  PublicImageRoutes,
} from "../../../../common/constants/route";
import Form from "../../../../component/form";
import TitleText from "../../../../component/title";
import { Text, Center, Flex, SimpleGrid, Space } from "@mantine/core";
import BackButton from "../../component/back-button";
import PhotoInput from "../../../../component/photo-input";
import Input from "../../../../component/input";
import FormActionComponent from "../../component/form-action-component";
import CategorySelect from "../../select/category-select";
import CarSelect from "../../select/car-select";
import SparePartBrandSelect from "../../select/spare-part-brand-select";
import { useDeleteSparePart } from "../../../../api-hooks/spare-part-api";
import { modals } from "@mantine/modals";
import { queryClient } from "../../../../pages/_app";
import notification from "../../../../component/notification";
import { useRouter } from "next/router";
import SupplierSelect from "../../select/supplier-select";

interface SparePartFormProps {
  sparePart?: GetSparePartModel;
  onSubmit: (values: SparePartFormType, files: FileWithPath[]) => Promise<void>;
}

export function useDeleteSparePartHook() {
  const { mutateAsync } = useDeleteSparePart();
  const { push } = useRouter();
  const onDelete = (item: SparePartModel) => {
    modals.openConfirmModal({
      title: "Hapus Barang",
      children: (
        <Center>
          <Text>
            Barang{" "}
            <Text span fw={600}>
              {item.name}
            </Text>{" "}
            akan dihapus. Yakin ingin menghapus barang ini?
          </Text>
        </Center>
      ),
      labels: {
        confirm: "Hapus",
        cancel: "Tidak",
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await mutateAsync(item.id.toString());
          queryClient.refetchQueries({
            queryKey: ["get-spare-parts"],
            exact: true,
          });
          push(`${NavigationRoutes.sparePart}`);
          notification.success({
            title: "Success",
            message: "Berhasil menghapus barang",
          });
        } catch (e: any) {
          notification.error({
            title: e?.error,
            message: e?.message,
          });
        }
      },
    });
  };
  return onDelete;
}

export default function SparePartForm(props: SparePartFormProps) {
  const { sparePart } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues: SparePartFormType = {
    id_category: sparePart?.id_category?.toString() ?? "",
    id_spare_part_brand: sparePart?.id_spare_part_brand?.toString() ?? "",
    id_car: sparePart?.id_car?.toString(),
    id_supplier: sparePart?.id_supplier?.toString(),
    name: sparePart?.name ?? "",
    part_no: sparePart?.part_no ?? "",
    genuine: sparePart?.genuine ?? "asli",
    stock: sparePart?.stock ?? 0,
    capital_price: sparePart?.capital_price ?? 0,
    sell_method: sparePart?.sell_method ?? "pcs",
    is_available: sparePart?.is_available ?? false,
    sale_price: sparePart?.sale_price ?? 0,
    description: sparePart?.description ?? "",
    supply_date: sparePart?.supply_date
      ? new Date(sparePart?.supply_date)
      : new Date(),
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

  const onClickDelete = useDeleteSparePartHook();

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!sparePart}>
      <TitleText>{sparePart ? "Edit" : "Tambah"} Barang</TitleText>
      <Space h={"sm"} />
      <BackButton />
      <Space h={"sm"} />
      <SimpleGrid cols={2}>
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
          <CategorySelect label="Kategori" name="id_category" placeholder="Pilih Kategori" />
          <Input type="text" label="Part Number" name="part_no" />
          <Input type="number" label="Harga Modal" name="capital_price" />
          <Input type="check-box" label="Barang Dijual?" name="is_available" />
          <SupplierSelect
            name="id_supplier"
            label="Supplier"
            disabled={!!sparePart ? true : false}
            placeholder="Pilih Supplier"
          />
          <Input
            type="date"
            label="Tanggal Supply"
            name="supply_date"
            disabled={!!sparePart ? true : false}
          />
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
            placeholder="Pilih Merk Barang"
          />
          <CarSelect label="Mobil" name="id_car" placeholder="Umum" />
          <Input type="number" label="Stok" name="stock" />
          <Input type="number" label="Harga Jual" name="sale_price" />
          <Flex direction={"row"} gap={48}>
            <Input
              type="radio"
              label="Tipe"
              name="genuine"
              data={[
                { value: "asli", label: "Asli" },
                { value: "replika", label: "Replika" },
              ]}
            />
            <Input
              type="radio"
              label="Metode Jual"
              name="sell_method"
              data={[
                { value: "pcs", label: "/pcs" },
                { value: "set", label: "/set" },
              ]}
            />
          </Flex>
        </Flex>
      </SimpleGrid>
      <FormActionComponent
        onClickDelete={sparePart ? () => onClickDelete(sparePart) : undefined}
      />
    </Form>
  );
}
