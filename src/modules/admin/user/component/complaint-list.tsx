import { useGetComplaints } from "../../../../api-hooks/complaint-api";
import useTableDataGenerator from "../../../../hooks/use-table-data-generator";
import { formatDate, formatPhone } from "../../../../utils/string";
import LoaderView from "../../component/loader-view";
import TableList from "../../component/table-list";
import { ComplaintFilter } from "./complaint-type";

interface ComplaintListProps {
  filter?: ComplaintFilter;
}

export default function ComplaintList(props: ComplaintListProps) {
  const { filter } = props;
  const query = useGetComplaints(filter);
  const { data = [] } = query;
  const table = useTableDataGenerator({
    data,
    onRowCustom(item) {
      return [
        item.User.name,
        formatPhone(item.User.phone),
        item.complaint,
        item.created_at ? formatDate(item.created_at) : "-",
      ];
    },
    onGenerateHead(item) {
      return ["Nama Pelanggan", "Nomor Telepon", "Keluhan", "Tanggal"];
    },
  });
  return (
    <LoaderView query={query}>
      {(data) => <TableList data={table} />}
    </LoaderView>
  );
}
