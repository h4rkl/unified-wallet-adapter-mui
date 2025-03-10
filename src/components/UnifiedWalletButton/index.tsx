import React, { ReactNode, useCallback } from 'react';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import { Button, Box, Typography, useTheme } from '@mui/material';

import { CurrentUserBadge } from '../CurrentUserBadge';
import { useUnifiedWalletContext, useUnifiedWallet } from '../../contexts/UnifiedWalletProvider';
import { MWA_NOT_FOUND_ERROR } from '../../contexts/UnifiedWalletContext';
import { useTranslation } from '../../contexts/TranslationProvider';

const getThemeStyles = (theme: string, muiTheme: any) => {
  switch (theme) {
    case 'light':
      return {
        bgcolor: muiTheme.palette.mode === 'light' ? muiTheme.palette.common.white : muiTheme.palette.common.white,
        color: muiTheme.palette.mode === 'light' ? muiTheme.palette.common.black : muiTheme.palette.common.black,
      };
    case 'dark':
      return {
        bgcolor: muiTheme.palette.mode === 'dark' ? '#31333B' : '#31333B',
        color: muiTheme.palette.mode === 'dark' ? muiTheme.palette.common.white : muiTheme.palette.common.white,
      };
    default:
      return {
        bgcolor: muiTheme.palette.mode === 'light' ? muiTheme.palette.common.white : muiTheme.palette.common.white,
        color: muiTheme.palette.mode === 'light' ? muiTheme.palette.common.black : muiTheme.palette.common.black,
      };
  }
};

export const UnifiedWalletButton: React.FC<{
  overrideContent?: ReactNode;
  buttonClassName?: string;
  currentUserClassName?: string;
}> = ({ overrideContent, buttonClassName, currentUserClassName }) => {
  const { setShowModal } = useUnifiedWalletContext();
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
                ...getThemeStyles(theme, muiTheme),
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
                ...getThemeStyles(theme, muiTheme),
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
