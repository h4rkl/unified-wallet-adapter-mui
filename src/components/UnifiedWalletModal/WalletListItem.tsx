import { Adapter } from '@solana/wallet-adapter-base';
import React, { DetailedHTMLProps, FC, ImgHTMLAttributes, MouseEventHandler, useCallback, useMemo } from 'react';

import UnknownIconSVG from '../icons/UnknownIconSVG';
import { isMobile } from '../../misc/utils';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import { useTranslation } from '../../contexts/TranslationProvider';

// Material UI imports
import { Box, Button, Typography } from '@mui/material';

export interface WalletIconProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  wallet: Adapter | null;
  width?: number;
  height?: number;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, width = 24, height = 24 }) => {
  const [hasError, setHasError] = React.useState(false);

  const onError = useCallback(() => setHasError(true), []);

  if (wallet && wallet.icon && !hasError) {
    return (
      <Box sx={{ minWidth: width, minHeight: height }}>
        <img
          width={width}
          height={height}
          src={wallet.icon}
          alt={`${wallet.name} icon`}
          style={{ objectFit: 'contain' }}
          onError={onError}
        />
      </Box>
    );
  } else {
    return (
      <Box sx={{ minWidth: width, minHeight: height }}>
        <UnknownIconSVG width={width} height={height} />
      </Box>
    );
  }
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

  return (
    <li>
      <Button onClick={handleClick} variant="text">
        {isMobile() ? (
          <WalletIcon wallet={wallet} width={24} height={24} />
        ) : (
          <WalletIcon wallet={wallet} width={30} height={30} />
        )}
        <Typography
          variant="body2"
          fontWeight="600"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {adapterName}
        </Typography>
      </Button>
    </li>
  );
};
