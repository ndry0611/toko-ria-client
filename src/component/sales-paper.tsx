import {
  Center,
  Flex,
  Image,
  NumberFormatter,
  Paper,
  Space,
  Table,
  Text,
} from "@mantine/core";
import useTableDataGenerator from "../hooks/use-table-data-generator";
import { GetSaleModel } from "../modules/admin/sales/components/type";
import { formatDate } from "../utils/string";
import React, { forwardRef, ForwardedRef } from "react";

interface SalePaperProps {
  sale: GetSaleModel;
}

const SalePaper = forwardRef<HTMLDivElement, SalePaperProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { sale } = props;
    let idx = 0;
    const table = useTableDataGenerator({
      data: sale?.SaleDetail ?? [],
      onRowCustom(item) {
        idx += 1;
        return [
          idx,
          item.SparePart.part_no,
          item.SparePart.name,
          item.SparePart.SparePartBrand?.name,
          item.quantity,
          item.SparePart.sell_method,
          <Text ta="right" key={`${idx}-${item.SparePart.part_no}`}>
            <NumberFormatter value={item.price} thousandSeparator />
          </Text>,
          <Text ta="right" key={`${idx}-${item.SparePart.part_no}`}>
            <NumberFormatter
              key={`${idx}-${item.SparePart.part_no}`}
              value={item.total_price}
              thousandSeparator
            />
          </Text>,
        ];
      },
      onGenerateHead(item) {
        return [
          "#",
          "Part Number",
          "Nama Barang",
          "Merk Barang",
          "Qty",
          "Satuan",
          "Harga @",
          "Jumlah",
        ];
      },
    });
    return (
      <div ref={ref}>
        <Center>
          <Paper withBorder w={"911px"} h={"529px"} p={"lg"}>
            <Flex justify={"space-between"} mb={10}>
              <Image src={"/logo-bnw.svg"} alt="logo" w={120} h={60} />
              <Flex gap={6}>
                <Text>Customer:</Text>
                <Flex direction={"column"}>
                  <Text>{sale?.User.name}</Text>
                  <Text>{sale?.User.address}</Text>
                </Flex>
              </Flex>
              <Flex direction={"column"}>
                <Text>Nomor Faktur: {sale?.code}</Text>
                <Text>
                  Tanggal:{" "}
                  {sale?.created_at ? formatDate(sale.created_at) : "-"}
                </Text>
              </Flex>
            </Flex>
            <Table data={table} styles={{ th: { border: "1px solid" } }} />
            <Flex
              justify={"right"}
              style={{ borderTop: "1px solid" }}
              pr={"xs"}
            >
              <Text>Total:</Text>
              <Space w={"sm"} />
              <NumberFormatter
                style={{ fontWeight: "bold" }}
                prefix="Rp."
                value={sale?.grand_total}
                thousandSeparator
              />
            </Flex>
          </Paper>
        </Center>
      </div>
    );
  }
);
SalePaper.displayName = "Sale Paper";

export default SalePaper;