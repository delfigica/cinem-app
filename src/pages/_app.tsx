import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

import theme from '../theme.js';
import '../styles/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
