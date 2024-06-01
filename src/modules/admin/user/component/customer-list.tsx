import { modals } from "@mantine/modals";
import { useGetUsers, useUpdateUser } from "../../../../api-hooks/user-api";
import useTableDataGenerator from "../../../../hooks/use-table-data-generator";
import LoaderView from "../../component/loader-view";
import { UpdateUserFormType, UserFilter } from "./user-type";
import { Center, Text } from "@mantine/core";
import { queryClient } from "../../../../pages/_app";
import notification from "../../../../component/notification";
import TableList from "../../component/table-list";
import CustomerStatusForm from "./customer-status-form";
import React from "react";
import CustomerStatusView from "./customer-status-view";

interface CustomerListProps {
  filter?: UserFilter;
}

export default function CustomerList(props: CustomerListProps) {
  let { filter } = props;
  filter = {
    ...filter,
    id_role: "2",
    daftar: "aktif",
  };
  const query = useGetUsers(filter);
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onClickDetail(item) {
      modals.open({
        title: "Status Pelanggan",
        children: <CustomerStatusView user={item} />,
      });
    },
    onRowCustom(item) {
      return [
        item.name,
        item.phone,
        item.address,
        item.status === "ACTIVE"
          ? "Aktif"
          : item.status === "INACTIVE"
          ? "Tidak Aktif"
          : "-",
      ];
    },
    onGenerateHead(item) {
      return ["Nama Pelanggan", "Nomor Telepon", "Alamat", "Status Akun"];
    },
  });
  return (
    <LoaderView query={query}>
      {(data) => <TableList data={table} />}
    </LoaderView>
  );
}
