import { Adapter } from '@solana/wallet-adapter-base';
import React from 'react';
import { useTranslation } from '../../contexts/TranslationProvider';
import { IStandardStyle, IUnifiedTheme, useUnifiedWalletContext } from '../../contexts/UnifiedWalletContext';
import ExternalIcon from '../icons/ExternalIcon';

// Material UI imports
import { Box, Typography, Button, Stack, Divider, styled } from '@mui/material';

// Replace the existing styles definition
const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'customtheme',
})<{ customtheme: 'light' | 'dark' | 'jupiter' }>(({ theme, customtheme }) => ({
  color: 'white',
  fontWeight: 600,
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '16px 8px',
  fontSize: '0.75rem',
  lineHeight: 'none',
  ...(customtheme === 'light' && {
    backgroundColor: '#31333B',
    '&:hover': {
      backgroundColor: 'black',
    },
  }),
  ...(customtheme === 'dark' && {
    backgroundColor: '#31333B',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  }),
  ...(customtheme === 'jupiter' && {
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  }),
}));

const styles: IStandardStyle = {
  subtitle: {
    light: [],
    dark: [],
    jupiter: [],
  },
  button: {
    light: [],
    dark: [],
    jupiter: [],
  },
};

const NotInstalled: React.FC<{ adapter: Adapter; onClose: () => void; onGoOnboarding: () => void }> = ({
  adapter,
  onClose,
  onGoOnboarding,
}) => {
  const { theme } = useUnifiedWalletContext();
  const { t } = useTranslation();

  return (
    <Box 
      sx={{ 
        animation: 'fadeIn 0.5s', 
        overflow: 'auto',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }}
      className="hideScrollbar"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 5 }}>
        <img src={adapter.icon} width={100} height={100} alt={adapter.name} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="body1" fontWeight="600">
          {t(`Have you installed`) + ` ${adapter.name}?`}
        </Typography>

        <a
          href={adapter.url}
          rel="noopener noreferrer"
          target="_blank"
          style={{ 
            fontSize: '0.75rem', 
            display: 'flex', 
            margin: '12px 0', 
            alignItems: 'center', 
            textDecoration: 'underline',
            gap: '8px'
          }}
        >
          <span>
            {t(`Install`)} {adapter.name}
          </span>
          <ExternalIcon />
        </a>

        <Box sx={{ mt: 5, width: '100%', px: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', textAlign: 'left' }}>
          <Typography variant="caption" fontWeight="600">
            {t(`On mobile:`)}
          </Typography>
          <Box component="ul" sx={{ fontSize: '0.75rem', pl: 8, mt: 2, listStyleType: 'disc' }}>
            <li>{t(`You should open the app instead`)}</li>
          </Box>
        </Box>

        <Box sx={{ mt: 5, width: '100%', px: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', textAlign: 'left' }}>
          <Typography variant="caption" fontWeight="600">
            {t(`On desktop:`)}
          </Typography>
          <Box component="ul" sx={{ fontSize: '0.75rem', pl: 8, mt: 2, listStyleType: 'disc' }}>
            <li>{t(`Install and refresh the page`)}</li>
          </Box>
        </Box>

        <Divider sx={{ mt: 5, width: '100%', borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', width: '100%', p: 5 }}>
          <ActionButton customtheme={theme} onClick={onGoOnboarding}>
            {t(`I don't have a wallet`)}
          </ActionButton>

          <ActionButton customtheme={theme} onClick={onClose}>
            {'← ' + t(`Go back`)}
          </ActionButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default NotInstalled;
