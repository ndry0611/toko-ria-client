import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../../theme";
import { TokenProvider } from "../hooks/use-token";

export const metadata = {
  title: "Toko Ria Sigli",
  description: "Autoparts Shop",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/logo.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <TokenProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
