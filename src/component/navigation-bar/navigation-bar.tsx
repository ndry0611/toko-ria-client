import { ActionIcon, Card, Flex } from "@mantine/core";
import {
  House,
  Receipt,
  ShoppingCart,
  UserCircle,
} from "@phosphor-icons/react";
import { NavigationRoutes } from "../../common/constants/route";
import { useRouter } from "next/router";

export default function NavigationBar() {
  const size = 36;
  const { push, pathname } = useRouter();
  const navigations = [
    {
      icon: (
        <House
          size={size}
          weight={
            `${NavigationRoutes.userHome}` === pathname ? "fill" : "regular"
          }
        />
      ),
      link: `${NavigationRoutes.userHome}`,
    },
    {
      icon: (
        <ShoppingCart
          size={size}
          weight={`${NavigationRoutes.cart}` === pathname ? "fill" : "regular"}
        />
      ),
      link: `${NavigationRoutes.cart}`,
    },
    {
      icon: (
        <Receipt
          size={size}
          weight={
            `${NavigationRoutes.transaction}` === pathname ? "fill" : "regular"
          }
        />
      ),
      link: `${NavigationRoutes.transaction}`,
    },
    {
      icon: (
        <UserCircle
          size={size}
          weight={
            `${NavigationRoutes.profile}` === pathname ? "fill" : "regular"
          }
        />
      ),
      link: `${NavigationRoutes.profile}`,
    },
  ];
  return (
    <Card withBorder mih={70} mah={70}>
      <Flex
        direction={"row"}
        maw={768}
        justify="space-around"
        w="100%"
        m="auto"
      >
        {navigations.map((navigation) => (
          <ActionIcon
            size="lg"
            variant="subtle"
            key={navigation.link}
            onClick={() => push(navigation.link)}
          >
            {navigation.icon}
          </ActionIcon>
        ))}
      </Flex>
    </Card>
  );
}
