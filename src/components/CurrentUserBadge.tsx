import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { shortenAddress } from '../misc/utils';
import { Button, Box, Typography } from '@mui/material';

export const CurrentUserBadge: React.FC<{ onClick?: () => void; className?: string }> = ({ onClick, className }) => {
  const { wallet, publicKey } = useWallet();

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
      }}
    >
      <Box
        sx={{
          width: '16px',
          height: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          mr: 0.5,
        }}
      >
        <img alt="Wallet logo" width={16} height={16} src={wallet?.adapter?.icon} />
      </Box>

      <Typography variant="caption">
        {shortenAddress(`${publicKey}`)}
      </Typography>
    </Button>
  );
};