import { createEmotionCache, MantineProvider } from "@mantine/core";
import { Navbar } from "../components/common/Navbar";
import type { AppProps } from "next/app";
import { SITE_NAME } from "../config/config";
import Head from "next/head";

export const cssCache = createEmotionCache({ key: "mantine" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="description" content="......" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </Head>

      <MantineProvider
        emotionCache={cssCache}
        withGlobalStyles
        withNormalizeCSS
      >
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;
