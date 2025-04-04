import React from 'react';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';

import { NotificationManager } from '../components/WalletNotification';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component className="App" {...pageProps} />
      <NotificationManager />
    </>
  );
}
