import PhoneLayout from "./phone-layout/phone-layout";
import SideNavigation from "./side-navigation/side-navigation";
import { useRouter } from "next/router";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): any {
  const { pathname } = useRouter();
  const isAdmin = pathname.includes("admin");
  const isUser = pathname.includes("user");
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  if (isLogin) {
    return children;
  }

  if (isAdmin) {
    return <SideNavigation>{children}</SideNavigation>;
  }

  if (isUser) {
    return <PhoneLayout>{children}</PhoneLayout>
  }

  return children;
}
