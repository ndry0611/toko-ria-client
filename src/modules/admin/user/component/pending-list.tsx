import {
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
} from "../../../../api-hooks/user-api";
import useTableDataGenerator from "../../../../hooks/use-table-data-generator";
import LoaderView from "../../component/loader-view";
import { UserFilter } from "./user-type";
import { queryClient } from "../../../../pages/_app";
import notification from "../../../../component/notification";
import TableList from "../../component/table-list";

interface PendingListProps {
  filter?: UserFilter;
}

export default function PendingList(props: PendingListProps) {
  let { filter } = props;
  filter = {
    ...filter,
    id_role: 2,
    status: false,
  };
  const query = useGetUsers(filter);
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: acceptUser } = useUpdateUser();
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    async onClickDelete(item) {
      try {
        await deleteUser(item.id.toString());
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
    async onClickApprove(item) {
      try {
        await acceptUser({
          id: item.id.toString(),
          body: { status: true },
        });
        queryClient.refetchQueries({
          queryKey: ["get-users", filter],
        });
        notification.success({
          title: "Success",
          message: "Berhasil mengupdate User",
        });
      } catch (e: any) {
        notification.error({
          title: e?.error,
          message: e?.message,
        });
      }
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
