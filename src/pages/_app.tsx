import type { AppProps } from "next/app";
import { NextPage } from "next";
import { MantineProvider } from "@mantine/core";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <MantineProvider>{getLayout(<Component {...pageProps} />)}</MantineProvider>
  );
}
