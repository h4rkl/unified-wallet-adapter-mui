import React, { DetailedHTMLProps, FC, ImgHTMLAttributes, MouseEventHandler, useMemo } from 'react';
import { Adapter } from '@solana/wallet-adapter-base';
import { Box, Button, Typography } from '@mui/material';
import { PhoneAndroid, AccountBalanceWallet } from '@mui/icons-material';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import { isMobile } from '../../misc/utils';
import { useTranslation } from '../../contexts/TranslationProvider';

export interface WalletIconProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  wallet: Adapter | null;
  width?: number;
  height?: number;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, width = 24, height = 24 }) => {
  // Choose appropriate icon based on wallet name or use wallet icon if available
  const WalletIconComponent = useMemo(() => {
    if (!wallet) return AccountBalanceWallet;
    if (wallet.name === SolanaMobileWalletAdapterWalletName) return PhoneAndroid;
    return AccountBalanceWallet;
  }, [wallet?.name]);

  return (
    <Box sx={{ minWidth: width, minHeight: height, mr: 1.5, display: 'flex', alignItems: 'center' }}>
      {wallet?.icon ? (
        <img 
          src={wallet.icon} 
          alt={`${wallet.name} icon`}
          style={{ width: Math.max(width, height), height: Math.max(width, height) }}
        />
      ) : (
        <WalletIconComponent sx={{ fontSize: Math.max(width, height) }} color="primary" />
      )}
    </Box>
  );
};

export interface WalletListItemProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  wallet: Adapter;
}

export const WalletListItem = ({ handleClick, wallet }: WalletListItemProps) => {
  const { t } = useTranslation();

  const adapterName = useMemo(() => {
    if (!wallet) return '';
    if (wallet.name === SolanaMobileWalletAdapterWalletName) return t(`Mobile`);
    return wallet.name;
  }, [wallet?.name]);

  const iconSize = isMobile() ? 24 : 30;

  return (
    <Button
      onClick={handleClick}
      fullWidth
      variant="outlined"
      sx={{
        justifyContent: 'flex-start',
        padding: '8px 16px',
        textTransform: 'none',
      }}
    >
      <WalletIcon wallet={wallet} width={iconSize} height={iconSize} />
      <Typography
        variant="body2"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {adapterName}
      </Typography>
    </Button>
  );
};
