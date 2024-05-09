import { useRouter } from "next/router";
import { useDeleteCar, useGetCars } from "../../../api-hooks/car-api";
import useTableDataGenerator from "../../../hooks/use-table-data-generator";
import { NavigationRoutes } from "../../../common/constants/route";
import { modals } from "@mantine/modals";
import { Center, Flex, SimpleGrid, Space, Text } from "@mantine/core";
import { queryClient } from "../../../pages/_app";
import notification from "../../../component/notification";
import TitleText from "../component/title";
import CreateButton from "../component/create-button";
import LoaderView from "../component/loader-view";
import TableList from "../component/table-list";
import Form from "../../../component/form";
import React from "react";
import { CarsFilter } from "./component/type";
import { useForm } from "react-hook-form";
import CarBrandSelect from "../select/car-brand-select";
import Input from "../../../component/input";
import FindButton from "../component/find-button";

export default function CarList() {
  const [carFilter, setCarFilter] = React.useState<CarsFilter>({});
  const { mutateAsync } = useDeleteCar();
  const { push } = useRouter();
  const methods = useForm({ defaultValues: carFilter });

  const query = useGetCars(carFilter);
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      push(`${NavigationRoutes.car}/${item.id}`);
    },
    onClickDelete(item) {
      modals.openConfirmModal({
        title: "Hapus Mobil",
        children: (
          <Center>
            <Text>
              Apakah Anda yakin untuk menghapus mobil{" "}
              <Text span fw={600}>
                {item.name}
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
            await mutateAsync(item.id.toString());
            queryClient.refetchQueries({
              queryKey: ["get-cars"],
            });
            notification.success({
              title: "Success",
              message: "Berhasil menghapus mobil",
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
    onRowCustom(item) {
      return [item.name, item.production_year, item.CarBrand.name, item.type];
    },
    onGenerateHead(item) {
      return ["Nama Mobil", "Tahun Produksi", "Merk Mobil", "Tipe"];
    },
  });

  return (
    <>
      <TitleText>Mobil</TitleText>
      <Space h={"sm"} />
      <Form
        methods={methods}
        onSubmit={(values) => {
          setCarFilter(values);
        }}
      >
        <SimpleGrid cols={3}>
          <CarBrandSelect name="id_car_brand" label="Merk Mobil" />
          <Input type="text" name="name" label="Nama Mobil" />
          <Input type="text" name="production_year" label="Tahun Produksi" />
        </SimpleGrid>
        <Space h={"sm"} />
        <Flex justify={"right"} gap={15} m={"5px 0px"}>
          <FindButton />
          <CreateButton />
        </Flex>
      </Form>
      <Space h={"sm"} />
      <LoaderView query={query}>
        {(data) => <TableList data={table} />}
      </LoaderView>
    </>
  );
}
