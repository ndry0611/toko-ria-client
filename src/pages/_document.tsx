import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

export default function Document() {
  return (
    <Html>
      <title>Toko Ria Sigli</title>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/logo.svg" />
        <ColorSchemeScript />
        <style></style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
