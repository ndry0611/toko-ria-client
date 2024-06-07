import Link from "next/link";
import { GetSalesModel } from "../../../admin/sales/components/type";
import { useRouter } from "next/router";
import { Card, Container, Flex, SimpleGrid, Text } from "@mantine/core";
import { formatDate, stringToMoney } from "../../../../utils/string";
import { color } from "../../../../common/constants/color";

interface TransactionCardProps {
  sale: GetSalesModel;
}

export default function TransactionCard(props: TransactionCardProps) {
  const { sale } = props;
  const { pathname } = useRouter();
  return (
    <Link href={`${pathname}/${sale.id}`} style={{ textDecoration: "none"}}>
      <Card withBorder py={8} px={0} mx={0}>
        <SimpleGrid cols={2}>
          <Container px={8} mx={0}>
            <Text fz={10}>Nomor Order: {sale.code}</Text>
            <Text fz={10}>
              Pembelian: {sale.payment_method === 1 ? "Offline" : "Online"}
            </Text>
            <Text fz={10}>
              Tanggal Pembayaran:{" "}
              {sale.payment_date ? formatDate(sale.payment_date) : "-"}
            </Text>
            <Flex gap={"sm"}>
              <Text fz={10}>Status:</Text>
              <SaleStatus sale={sale} />
            </Flex>
          </Container>
          <Container px={8} m={0}>
            <Text ta={"right"} fz={12} fw={500}>Total</Text>
            <Text ta={"right"} fz={12} fw={700}>{stringToMoney(sale.grand_total)}</Text>
          </Container>
        </SimpleGrid>
      </Card>
    </Link>
  );
}

export function SaleStatus(props: { sale: GetSalesModel }) {
  const { sale } = props;
  const getAttribute = (sale: GetSalesModel) => {
    if (sale.status === 1) {
      if (sale.payment_date) {
        return {
          color: color.mainTheme,
          text: "Packing",
        };
      } else {
        return {
          color: color.mainBlue,
          text: "Menunggu Pembayaran",
        };
      }
    } else if (sale.status === 2) {
      return {
        color: color.mainTheme,
        text: "Dikirim",
      };
    } else if (sale.status === 3) {
      return {
        color: color.mainRed,
        text: "Dibatalkan",
      };
    } else if (sale.status === 4) {
      return {
        color: color.mainGreen,
        text: "Selesai",
      };
    } else {
      return {
        color: color.mainRed,
        text: "Error",
      };
    }
  };
  const attribute = getAttribute(sale);
  return (
    <Card radius={"lg"} bg={attribute.color} fz={10} c={"white"} px={8} py={0} ta={"center"}>
      {attribute.text}
    </Card>
  );
}
