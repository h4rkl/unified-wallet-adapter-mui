import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { NotificationManager } from '../components/WalletNotification';
import theme from '../theme';
import GlobalStyles from '../styles/GlobalStyles';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Component className="App" {...pageProps} />
      <NotificationManager />
    </ThemeProvider>
  );
}
