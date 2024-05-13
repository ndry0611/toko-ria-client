import { useRouter } from "next/router";
import {
  useDeleteSparePartBrand,
  useGetSparePartBrands,
} from "../../../../../api-hooks/spare-part-brand-api";
import useTableDataGenerator from "../../../../../hooks/use-table-data-generator";
import { modals } from "@mantine/modals";
import { Button, Center, Space, Text } from "@mantine/core";
import { queryClient } from "../../../../../pages/_app";
import notification from "../../../../../component/notification";
import { Plus } from "@phosphor-icons/react";
import LoaderView from "../../../component/loader-view";
import TableList from "../../../component/table-list";
import CreateSparePartBrand from "./spare-part-brand-create";
import SparePartBrandView from "./spare-part-brand-view";

export default function SparePartBrandList() {
  const query = useGetSparePartBrands();
  const { mutateAsync: deleteSparePartBrand } = useDeleteSparePartBrand();
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      modals.open({
        title: "Edit Merk Barang",
        children: <SparePartBrandView sparePartBrand={item} />,
      });
    },
    onClickDelete(item) {
      modals.openConfirmModal({
        title: "Hapus Merk Barang",
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
            await deleteSparePartBrand(item.id.toString());
            queryClient.refetchQueries({ queryKey: ["get-spare-part-brands"] });
            notification.success({
              title: "Success",
              message: "Berhasil menghapus Merk Barang",
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
      return ["Merk Barang", "Manufaktur"];
    },
  });
  return (
    <>
      <Button
        justify="center"
        leftSection={<Plus size={16} weight={"bold"} />}
        onClick={() =>
          modals.open({
            title: "Tambah Merk Barang",
            children: <CreateSparePartBrand />,
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
