import { Button, Space, Text } from "@mantine/core";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import NavigationBar from "../../../component/navigation-bar/navigation-bar";
import { useCartCheckout, useGetCart } from "../../../api-hooks/cart-api";
import LoaderView from "../../admin/component/loader-view";
import CartDetail from "./component/cart-details";
import React from "react";
import notification from "../../../component/notification";
import { useRouter } from "next/router";
import { NavigationRoutes } from "../../../common/constants/route";

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
  const { push } = useRouter();
  const query = useGetCart();
  const { data } = query;
  const { mutateAsync } = useCartCheckout();

  const handleCheckout = React.useCallback(async () => {
    try {
      const sale = await mutateAsync();
      notification.success({
        title: "Checkout Berhasil",
        message: "Checkout Keranjang Belanja Berhasil",
      });
    } catch (e: any) {
      notification.error({
        title: "Checkout Gagal",
        message: `${e?.message}`,
      });
    }
  }, [mutateAsync]);

  return (
    <>
      <LoaderView query={query}>
        {(data) => {
          return data.CartDetail.map((item) => {
            return <CartDetail key={item.id} item={item} />;
          });
        }}
      </LoaderView>
      <Space h={"lg"} />
      <Button fullWidth onClick={handleCheckout}>Checkout</Button>
    </>
  );
}
