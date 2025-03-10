import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { shortenAddress } from '../misc/utils';
import { IStandardStyle, useUnifiedWalletContext } from '../contexts/UnifiedWalletContext';
import { Button, Box, Typography } from '@mui/material';

const styles = {
  container: {
    light: {
      sx: {
        bgcolor: 'white',
        color: 'black',
      },
    },
    dark: {
      sx: {
        bgcolor: '#191B1F',
        color: 'white',
      },
    },
    jupiter: {
      sx: {
        bgcolor: 'v3-bg', // Assuming v3-bg is a custom theme variable
        color: 'white',
      },
    },
  },
  text: {
    light: { color: 'black' },
    dark: { color: 'white' },
    jupiter: { color: 'white' },
  },
};

export const CurrentUserBadge: React.FC<{ onClick?: () => void; className?: string }> = ({ onClick, className }) => {
  const { wallet, publicKey } = useWallet();
  const { theme } = useUnifiedWalletContext();

  if (!wallet || !publicKey) {
    return null;
  }

  return (
    <Button
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1, // padding y: 8px (equivalent to py-2)
        px: 1.5, // padding x: 12px (equivalent to px-3)
        borderRadius: '16px', // rounded-2xl
        height: '28px', // h-7
        cursor: 'pointer',
        ...styles.container[theme].sx,
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