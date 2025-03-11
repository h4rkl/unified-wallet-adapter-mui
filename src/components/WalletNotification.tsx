import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert, AlertTitle } from '@mui/material';

import { IUnifiedWalletConfig, IWalletNotification } from '../contexts/WalletConnectionProvider';

// Custom notification component that uses Material UI components
const NotificationManager = () => {
  const [notifications, setNotifications] = useState<
    {
      open: boolean;
      message: React.ReactNode;
      severity: 'success' | 'info' | 'warning' | 'error';
    }[]
  >([]);

  const showNotification = (message: React.ReactNode, severity: 'success' | 'info' | 'warning' | 'error') => {
    const newNotification = {
      open: true,
      message,
      severity,
    };
    setNotifications([...notifications, newNotification]);
  };

  const handleClose = (index: number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].open = false;
    setNotifications(updatedNotifications);
  };

  // Export methods to make them globally accessible
  React.useEffect(() => {
    // @ts-ignore - Adding to window for global access
    window.notificationManager = {
      success: (message: React.ReactNode) => showNotification(message, 'success'),
      info: (message: React.ReactNode) => showNotification(message, 'info'),
      warning: (message: React.ReactNode) => showNotification(message, 'warning'),
      error: (message: React.ReactNode) => showNotification(message, 'error'),
    };

    return () => {
      // @ts-ignore - Clean up
      delete window.notificationManager;
    };
  }, [notifications]);

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={index}
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => handleClose(index)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ mb: index * 8 }} // Stack notifications
        >
          <Alert severity={notification.severity} onClose={() => handleClose(index)} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

// Make sure to render this component at the root level of your app
// <NotificationManager />

// Helper function to show notifications using Material UI
const showNotification = {
  success: (message: React.ReactNode) => {
    // @ts-ignore - Global access
    if (window.notificationManager) window.notificationManager.success(message);
  },
  info: (message: React.ReactNode) => {
    // @ts-ignore - Global access
    if (window.notificationManager) window.notificationManager.info(message);
  },
  warning: (message: React.ReactNode) => {
    // @ts-ignore - Global access
    if (window.notificationManager) window.notificationManager.warning(message);
  },
  error: (message: React.ReactNode) => {
    // @ts-ignore - Global access
    if (window.notificationManager) window.notificationManager.error(message);
  },
};

const WalletNotification: IUnifiedWalletConfig['notificationCallback'] = {
  onConnect: (props: IWalletNotification) => {
    showNotification.success(
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <AlertTitle>Wallet Connected</AlertTitle>
        <Typography sx={{ fontSize: '0.75rem' }}>{`Connected to wallet ${props.shortAddress}`}</Typography>
      </Box>,
    );
  },
  onConnecting: (props: IWalletNotification) => {
    showNotification.info(
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <AlertTitle>Connecting</AlertTitle>
        <Typography>Connecting to {props.walletName}</Typography>
      </Box>,
    );
  },
  onDisconnect: (props: IWalletNotification) => {
    showNotification.info(
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <AlertTitle>Disconnected</AlertTitle>
        <Typography sx={{ fontSize: '0.75rem' }}>{`Disconnected from wallet ${props.shortAddress}`}</Typography>
      </Box>,
    );
  },
  onNotInstalled: (props: IWalletNotification) => {
    showNotification.error(
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <AlertTitle>{props.walletName} Wallet is not installed</AlertTitle>
        <Typography>
          {`Please go to the provider`}{' '}
          <Box
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'underline', fontWeight: 700 }}
            href={props.metadata.url}
          >
            {`website`}
          </Box>{' '}
          {`to download.`}
        </Typography>
      </Box>,
    );
  },
};

export { NotificationManager };
export default WalletNotification;
