import { Button, Card, Center, Flex, Space, Text } from "@mantine/core";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import NavigationBar from "../../../component/navigation-bar/navigation-bar";
import { useCartCheckout, useGetCart } from "../../../api-hooks/cart-api";
import LoaderView from "../../admin/component/loader-view";
import CartDetail from "./component/cart-details";
import React from "react";
import notification from "../../../component/notification";
import { queryClient } from "../../../pages/_app";
import { ShoppingBag } from "@phosphor-icons/react";
import { color } from "../../../common/constants/color";
import { modals } from "@mantine/modals";
import useSnapPay from "../../../hooks/use-snap-pay";

export default function CartPage() {
  return (
    <PhoneLayout
      centerComponent={
        <Text fw={700} ta={"center"}>
          Keranjang Belanja
        </Text>
      }
      bottomContainer={<NavigationBar />}
    >
      <CartList />
    </PhoneLayout>
  );
}

function CartList() {
  const onPay = useSnapPay();
  const query = useGetCart();
  const { data } = query;
  const { mutateAsync, isPending } = useCartCheckout();

  const handleCheckout = React.useCallback(async () => {
    modals.openConfirmModal({
      title: "Konfirmasi Barang Belanja",
      children: (
        <>
          <Text fz={12}>Anda yakin untuk checkout barang berikut?</Text>
          <Text fz={12}>
            Perlu diketahui bahwa segala transaksi bersifat final dan tidak
            dapat diubah!
          </Text>
        </>
      ),
      labels: {
        confirm: "Checkout",
        cancel: "Kembali",
      },
      onConfirm: async () => {
        try {
          const sale = await mutateAsync();
          notification.success({
            title: "Checkout Berhasil",
            message: "Checkout Keranjang Belanja Berhasil",
          });
          if (!sale.snap_token) {
            throw new Error("Gagal Melakukan Pembayaran! Hubungi Admin!");
          }
          onPay(sale);
          queryClient.refetchQueries({ queryKey: ["get-cart"] });
        } catch (e: any) {
          notification.error({
            title: "Checkout Gagal",
            message: `${e?.message}`,
          });
        }
      },
    });
  }, [mutateAsync, onPay]);

  return (
    <>
      <LoaderView query={query}>
        {(data) => {
          if (!data.CartDetail || data.CartDetail.length === 0) {
            return (
              <Flex
                w="100%"
                h="100%"
                align={"center"}
                justify={"center"}
                direction={"column"}
                pos={"absolute"}
              >
                <ShoppingBag size={128} weight="light" color={color.mainGrey} />
                <Text c={color.mainGrey}>Keranjang Belanja Kosong</Text>
              </Flex>
            );
          } else {
            return (
              <Flex direction="column" gap={16}>
                <>
                  {data.CartDetail.map((item) => {
                    return (
                      <>
                        <CartDetail key={item.id} item={item} />
                      </>
                    );
                  })}
                </>
                <Button
                  mb={16}
                  loading={isPending}
                  fullWidth
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Flex>
            );
          }
        }}
      </LoaderView>
    </>
  );
}
