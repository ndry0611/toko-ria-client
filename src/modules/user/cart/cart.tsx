import { Text } from "@mantine/core";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import NavigationBar from "../../../component/navigation-bar/navigation-bar";
import { useGetCart } from "../../../api-hooks/cart-api";
import LoaderView from "../../admin/component/loader-view";
import CartDetail from "./component/cart-details";

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
  const query = useGetCart();
  const { data } = query;
  return (
    <LoaderView query={query}>
      {(data) => {
        return data.CartDetail.map((item) => {
          return <CartDetail key={item.id} item={item} />;
        });
      }}
    </LoaderView>
  );
}
