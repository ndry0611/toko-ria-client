import type { AppProps } from "next/app";
import { NextPage } from "next";
import { MantineProvider } from "@mantine/core";
import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import Head from "next/head";
import { TokenProvider } from "../hooks/use-token";
import Layout from "../modules/admin/component/layout";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/dropzone/styles.css';

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
          <ModalsProvider modalProps={{ centered: true }}>
            <Notifications limit={5} position="top-center" />
            <TokenProvider>
              <>{getLayout(<Component {...pageProps} />)}</>
            </TokenProvider>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
