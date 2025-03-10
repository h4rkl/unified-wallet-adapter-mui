import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { shortenAddress } from '../misc/utils';
import { Button, Box, Typography, useTheme } from '@mui/material';

const styles = {
  container: {
    light: {
      sx: (theme: any) => ({
        bgcolor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.common.white,
        color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.black,
      }),
    },
    dark: {
      sx: (theme: any) => ({
        bgcolor: theme.palette.mode === 'dark' ? '#191B1F' : '#191B1F',
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.white,
      }),
    },
  },
  text: {
    light: { color: 'black' },
    dark: { color: 'white' },
  },
};

export const CurrentUserBadge: React.FC<{ onClick?: () => void; className?: string }> = ({ onClick, className }) => {
  const { wallet, publicKey } = useWallet();
  const muiTheme = useTheme();

  if (!wallet || !publicKey) {
    return null;
  }

  return (
    <Button
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        py: 1.5,
        px: 2.5,
        fontSize: '0.75rem',
        ...(typeof styles.container[theme].sx === 'function' 
          ? styles.container[theme].sx(muiTheme) 
          : styles.container[theme].sx),
      }}
      className={className}
    >
      <Box
        sx={{
          width: '16px', // w-4
          height: '16px', // h-4
          borderRadius: '50%', // rounded-full
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Wallet logo" width={16} height={16} src={wallet?.adapter?.icon} />
      </Box>

      <Typography
        sx={{
          ml: 1, // ml-2
          fontSize: '0.75rem', // text-xs
          ...styles.text[theme],
        }}
      >
        {shortenAddress(`${publicKey}`)}
      </Typography>
    </Button>
  );
};