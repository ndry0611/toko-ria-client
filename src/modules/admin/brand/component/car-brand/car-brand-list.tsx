import { modals } from "@mantine/modals";
import {
  useDeleteCarBrand,
  useGetCarBrands,
} from "../../../../../api-hooks/car-brand-api";
import useTableDataGenerator from "../../../../../hooks/use-table-data-generator";
import LoaderView from "../../../component/loader-view";
import TableList from "../../../component/table-list";
import { Button, Center, Space, Text } from "@mantine/core";
import { queryClient } from "../../../../../pages/_app";
import notification from "../../../../../component/notification";
import { useRouter } from "next/router";
import CarBrandView from "./car-brand-view";
import { Plus } from "@phosphor-icons/react";
import CreateCarBrand from "./car-brand-create";

export default function CarBrandList() {
  const { pathname } = useRouter();
  const query = useGetCarBrands();
  const { mutateAsync: deleteCarBrand } = useDeleteCarBrand();
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      modals.open({
        title: "Edit Merk Mobil",
        children: <CarBrandView carBrand={item} />,
      });
    },
    onClickDelete(item) {
      modals.openConfirmModal({
        title: "Hapus Merk Mobil",
        children: (
          <Center>
            <Text>
              Apakah Anda yakin untuk menghapus{" "}
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
            await deleteCarBrand(item.id.toString());
            queryClient.refetchQueries({ queryKey: ["get-car-brands"] });
            notification.success({
              title: "Success",
              message: "Berhasil menghapus Merk Mobil",
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
      return [item.name, item.manufacture];
    },
    onGenerateHead(item) {
      return ["Merk Mobil", "Manufaktur"];
    },
  });
  return (
    <>
      <Button
        justify="center"
        leftSection={<Plus size={16} weight={"bold"} />}
        onClick={() =>
          modals.open({
            title: "Tambah Merk Mobil",
            children: <CreateCarBrand />,
          })
        }
      >
        <Text fw={500}>Tambah</Text>
      </Button>
      <Space h={"sm"} />
      <LoaderView query={query}>
        {(data) => <TableList data={table} />}
      </LoaderView>
    </>
  );
}
