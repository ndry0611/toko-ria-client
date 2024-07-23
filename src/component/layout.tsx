import SideNavigation from "./side-navigation/side-navigation";
import { useRouter } from "next/router";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): any {
  const { pathname } = useRouter();
  const isAdmin = pathname.includes("admin");

  if (isAdmin) {
    return <SideNavigation>{children}</SideNavigation>;
  }

  return children;
}
