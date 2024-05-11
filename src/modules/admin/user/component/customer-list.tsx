import { modals } from "@mantine/modals";
import { useDeleteUser, useGetUsers } from "../../../../api-hooks/user-api";
import useTableDataGenerator from "../../../../hooks/use-table-data-generator";
import LoaderView from "../../component/loader-view";
import { UserFilter } from "./user-type";
import { Center, Text } from "@mantine/core";
import { queryClient } from "../../../../pages/_app";
import notification from "../../../../component/notification";
import TableList from "../../component/table-list";

interface CustomerListProps {
  filter?: UserFilter;
}

export default function CustomerList(props: CustomerListProps) {
  let { filter } = props;
  filter = {
    ...filter,
    id_role: "2",
    status: true
  }
  const query = useGetUsers(filter);
  const { mutateAsync } = useDeleteUser();
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onClickDelete(item) {
      modals.openConfirmModal({
        title: "Hapus Pelanggan",
        children: (
          <Center>
            <Text>
              Apakah Anda yakin untuk menghapus user{" "}
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
              queryKey: ["get-users", filter],
            });
            notification.success({
              title: "Success",
              message: "Berhasil menghapus User",
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
      return [item.name, item.phone, item.address];
    },
    onGenerateHead(item) {
      return ["Nama Pelanggan", "Nomor Telepon", "Alamat"];
    },
  });
  return (
    <LoaderView query={query}>
      {(data) => <TableList data={table} />}
    </LoaderView>
  );
}
