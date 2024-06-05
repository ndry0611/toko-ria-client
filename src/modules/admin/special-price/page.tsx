import { useRouter } from "next/router";
import {
  useCreateSpecialPrice,
  useDeleteSpecialPrice,
  useGetSpecialPricesByIdSparePart,
} from "../../../api-hooks/special-price-api";
import LoaderView from "../component/loader-view";
import TableList from "../component/table-list";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import { modals } from "@mantine/modals";
import {
  Center,
  Flex,
  SimpleGrid,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { queryClient } from "../../../pages/_app";
import notification from "../../../component/notification";
import TitleText from "../../../component/title";
import { formatDate, stringToMoney } from "../../../utils/string";
import Form from "../../../component/form";
import { useForm } from "react-hook-form";
import { useGetSparePart } from "../../../api-hooks/spare-part-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { SpecialPriceFormSchema, SpecialPriceFormType } from "./component/type";
import UserSelect from "../select/user-select";
import React from "react";
import Input from "../../../component/input";
import FormActionComponent from "../component/form-action-component";

export default function SpecialPricePage() {
  const { query } = useRouter();
  const idSparePart = query.id as string;

  const querySparePart = useGetSparePart(idSparePart);
  const { data: sparePart } = querySparePart;

  const querySpecialPrice = useGetSpecialPricesByIdSparePart(idSparePart);
  const { data: specialPriceData = [] } = querySpecialPrice;
  const { mutateAsync: deleteSpecialPrice } = useDeleteSpecialPrice();
  const { mutateAsync: createSpecialPrice } = useCreateSpecialPrice();

  const defaultValues = React.useMemo<SpecialPriceFormType>(() => {
    return {
      id_spare_part: idSparePart,
      id_user: "",
      price: 0,
    };
  }, [idSparePart]);

  const methods = useForm({
    resolver: yupResolver(SpecialPriceFormSchema()),
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: SpecialPriceFormType) => {
      try {
        await createSpecialPrice(values);
        notification.success({
          title: "Simpan Berhasil",
          message: "Simpan Harga Khusus Berhasil",
        });
        queryClient.invalidateQueries();
      } catch (e: any) {
        notification.error({
          title: "Simpan Gagal",
          message: `${e?.message}`,
        });
      }
    },
    [createSpecialPrice]
  );

  const table = useTableDataGenerator({
    data: specialPriceData,
    onRowCustom(item) {
      return [
        item.User.name,
        item.User.phone,
        stringToMoney(item.price),
        item.created_at ? formatDate(item.created_at) : "-",
      ];
    },
    onGenerateHead(item) {
      return [
        "Nama Pelanggan",
        "Nomor Telepon",
        "Harga Khusus",
        "Tanggal Harga",
      ];
    },
    onClickDelete(item) {
      modals.openConfirmModal({
        title: "Hapus Harga Khusus",
        children: (
          <Center>
            <Text>
              Apakah Anda yakin untuk menghapus harga khusus untuk{" "}
              <Text span fw={600}>
                {item.User.name}
              </Text>{" "}
              ?
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
            await deleteSpecialPrice(item.id.toString());
            queryClient.refetchQueries({
              queryKey: ["get-special-price"],
            });
            notification.success({
              title: "Success",
              message: "Berhasil menghapus harga khusus",
            });
          } catch (e: any) {
            notification.error({
              title: e?.error,
              message: e?.message,
            });
          }
        },
      });
    },
  });

  return (
    <>
      <TitleText>Edit Harga Khusus</TitleText>
      <Form methods={methods} onSubmit={onSubmit}>
        <SimpleGrid cols={3}>
          <Flex direction={"column"} gap={16}>
            <TextInput label="Nama Barang" value={sparePart?.name} disabled />
            <TextInput
              label="Harga Modal"
              value={
                sparePart?.capital_price
                  ? stringToMoney(sparePart?.capital_price)
                  : "-"
              }
              disabled
            />
            <TextInput
              label="Harga Jual"
              value={
                sparePart?.sale_price
                  ? stringToMoney(sparePart?.sale_price)
                  : "-"
              }
              disabled
            />
          </Flex>
          <Flex direction={"column"} gap={16} justify={"space-between"}>
            <UserSelect
              filtering={{ id_role: "2", status: "ACTIVE" }}
              label="Nama Pelanggan"
              name="id_user"
            />
            <Input type="number" name="price" label="Harga Khusus" />
            <Flex>
              <FormActionComponent />
            </Flex>
          </Flex>
        </SimpleGrid>
      </Form>
      <Space h={"sm"} />
      <LoaderView query={querySpecialPrice}>
        {(specialPrice) => <TableList data={table} />}
      </LoaderView>
    </>
  );
}
