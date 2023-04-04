import { createEmotionCache, MantineProvider } from "@mantine/core";
import { Navbar } from "../components/common/Navbar";
import type { AppProps } from "next/app";
import { SITE_NAME } from "../config/config";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../lib/queryClient";
import "../public/global.css";
import { AuthProvider } from "../contexts/AuthProvider";
import { Notifications } from "@mantine/notifications";

export const cssCache = createEmotionCache({ key: "mantine" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
        <Notifications />
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
