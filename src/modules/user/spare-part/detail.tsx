import { Text } from "@mantine/core";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import SparePartDetail from "./component/detail-page";

export default function SparePartDetailPage() {
  return (
    <PhoneLayout
      back
      centerComponent={
        <Text ta={"center"} fw={700}>
          Detail Barang
        </Text>
      }
    >
      <SparePartDetail />
    </PhoneLayout>
  );
}
