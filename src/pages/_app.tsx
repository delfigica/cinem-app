import { store } from "../store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "../theme.js";

import { Layout } from "@/components/Layout/Layout";
import "../styles/style.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Cocos Movies</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Layout>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Layout>
    </Provider>
  );
}
