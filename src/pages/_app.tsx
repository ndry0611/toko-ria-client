import type { AppProps } from "next/app";
import { NextPage } from "next";
import { MantineProvider } from "@mantine/core";
import { Poppins } from "next/font/google";
import React from "react";
import Head from "next/head";

import "@mantine/core/styles.css";
import { TokenProvider } from "../hooks/use-token";
import Layout from "../modules/admin/component/layout";
import { QueryClient, QueryClientProvider } from "react-query";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const __next = document.getElementById("__next");
      if (!__next) return;
      __next.className = `${poppins.variable}`;
    }
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <TokenProvider>
            <>{getLayout(<Component {...pageProps} />)}</>
          </TokenProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
