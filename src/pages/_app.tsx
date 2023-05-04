import { store } from "../store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

import theme from "../theme.js";
import "../styles/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
