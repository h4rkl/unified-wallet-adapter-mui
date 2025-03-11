import { UnifiedWalletProvider } from '../../contexts/UnifiedWalletProvider';
import { UnifiedWalletButton } from '../UnifiedWalletButton';
import WalletNotification from '../WalletNotification';
import { Cluster } from '@solana/web3.js';
import { useMemo } from 'react';
import { AllLanguage } from '../../contexts/TranslationProvider/i18n';
import { Box, Theme } from '@mui/material';

const ExampleBaseOnly: React.FC<{ theme: Theme; lang: AllLanguage }> = ({ theme, lang }) => {
  const params: Omit<Parameters<typeof UnifiedWalletProvider>[0], 'children'> = useMemo(
    () => ({
      wallets: [],
      config: {
        autoConnect: false,
        env: 'mainnet-beta' as Cluster,
        metadata: {
          name: 'UnifiedWallet',
          description: 'UnifiedWallet',
          url: 'https://jup.ag',
          iconUrls: ['https://jup.ag/favicon.ico'],
        },
        notificationCallback: WalletNotification,
        walletlistExplanation: {
          href: 'https://station.jup.ag/docs/additional-topics/wallet-list',
        },
        theme,
        lang,
      },
    }),
    [theme, lang],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <UnifiedWalletProvider {...params}>
        <UnifiedWalletButton />
      </UnifiedWalletProvider>
    </Box>
  );
};

export default ExampleBaseOnly;
