import { Button, Card, Flex, Space, Text } from "@mantine/core";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import { useRouter } from "next/router";
import { useGetSale } from "../../../api-hooks/sale-api";
import LoaderView from "../../admin/component/loader-view";
import TransactionItem from "./component/transaction-item";
import { stringToMoney } from "../../../utils/string";
import useSnapPay from "../../../hooks/use-snap-pay";
import { SaleStatus } from "./component/transaction-card";

export default function TransactionDetailsPage() {
  return (
    <PhoneLayout
      back
      centerComponent={
        <Text ta={"center"} fw={700}>
          Rincian Belanja
        </Text>
      }
    >
      <TransactionDetail />
    </PhoneLayout>
  );
}

function TransactionDetail() {
  const { query } = useRouter();
  const id = query.id as string;
  const querySale = useGetSale(id);
  const { data } = querySale;
  const onPay = useSnapPay();
  return (
    <LoaderView query={querySale}>
      {(data) => {
        const buttonPayment = data.status === 1 && !data.payment_date && (
          <Button
            fullWidth
            onClick={() => {
              onPay(data);
            }}
          >
            Bayar Sekarang
          </Button>
        );

        const buttonDelivery = data.status < 3 && !!data.payment_date && (
          <Button fullWidth disabled={data.status === 1}>
            Barang diterima
          </Button>
        );
        return (
          <>
            <Card>
              <SaleStatus sale={data} />
              <Text fz={14} fw={700}>
                Informasi Penerima
              </Text>
              <Text fz={12}>{data.User.name}</Text>
              <Text fz={12}>{data.User.phone}</Text>
              <Space h={"sm"} />
              <Text fz={14} fw={700}>
                Alamat Pengiriman
              </Text>
              <Text fz={12}>{data.User.address}</Text>
            </Card>
            {data.SaleDetail.map((item) => {
              return <TransactionItem key={item.id} item={item} />;
            })}
            <hr style={{ margin: "8px 0px" }} />
            <Flex justify={"space-between"}>
              <Text fw={700} fz={14}>Total</Text>
              <Text fw={700} fz={14}>{stringToMoney(data.grand_total)}</Text>
            </Flex>
            <Space h={"sm"}/>
            {buttonPayment}
            {buttonDelivery}
          </>
        );
      }}
    </LoaderView>
  );
}
