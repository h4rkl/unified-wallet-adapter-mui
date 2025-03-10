import React, { ReactNode, useCallback } from 'react';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import { Button, Box, Typography, useTheme } from '@mui/material';

import { CurrentUserBadge } from '../CurrentUserBadge';
import { useUnifiedWalletContext, useUnifiedWallet } from '../../contexts/UnifiedWalletProvider';
import { MWA_NOT_FOUND_ERROR } from '../../contexts/UnifiedWalletContext';
import { useTranslation } from '../../contexts/TranslationProvider';

const getThemeStyles = (theme: string) => {
  switch (theme) {
    case 'light':
      return {
        bgcolor: 'white',
        color: 'black',
      };
    case 'dark':
      return {
        bgcolor: '#31333B',
        color: 'white',
      };
    case 'jupiter':
      return {
        bgcolor: 'v3-bg',
        color: 'white',
      };
    default:
      return {
        bgcolor: 'white',
        color: 'black',
      };
  }
};

export const UnifiedWalletButton: React.FC<{
  overrideContent?: ReactNode;
  buttonClassName?: string;
  currentUserClassName?: string;
}> = ({ overrideContent, buttonClassName, currentUserClassName }) => {
  const { setShowModal, theme } = useUnifiedWalletContext();
  const { disconnect, connect, connecting, wallet } = useUnifiedWallet();
  const { t } = useTranslation();
  const muiTheme = useTheme();

  const content = (
    <>
      {connecting && (
        <Typography variant="caption">
          {t(`Connecting...`)}
        </Typography>
      )}
      {/* Mobile */}
      {!connecting && (
        <Typography variant="caption" sx={{ display: { xs: 'block', md: 'none' } }}>
          {t(`Connect`)}
        </Typography>
      )}
      {/* Desktop */}
      {!connecting && (
        <Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' } }}>
          {t(`Connect Wallet`)}
        </Typography>
      )}
    </>
  );

  const handleClick = useCallback(async () => {
    try {
      if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName) {
        await connect();
        return;
      } else {
        setShowModal(true);
      }
    } catch (error) {
      if (error instanceof Error && error.message === MWA_NOT_FOUND_ERROR) {
        setShowModal(true);
      }
    }
  }, [wallet, connect, setShowModal]);

  return (
    <>
      {!wallet?.adapter.connected ? (
        <>
          {overrideContent ? (
            <Box 
              sx={{
                ...getThemeStyles(theme),
                cursor: 'pointer',
              }}
              className={buttonClassName}
              onClick={handleClick}
            >
              {overrideContent}
            </Box>
          ) : (
            <Button
              type="button"
              sx={{
                borderRadius: '8px',
                fontSize: '0.75rem',
                py: 1.5,
                px: 2.5,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center',
                width: 'auto',
                ...getThemeStyles(theme),
              }}
              className={buttonClassName}
              onClick={handleClick}
            >
              {content}
            </Button>
          )}
        </>
      ) : (
        <CurrentUserBadge onClick={disconnect} className={currentUserClassName} />
      )}
    </>
  );
};
