import NavbarSimple from "../../../component/common/side-navigation/side-navigation";
import { useRouter } from "next/router";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): any {
  const { pathname } = useRouter();
  const isAdmin = pathname.includes("admin");
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return children;
  }

  if (isAdmin) {
    return <NavbarSimple>{children}</NavbarSimple>;
  }

  return children;
}
