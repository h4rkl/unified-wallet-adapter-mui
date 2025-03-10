import { Adapter, WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'react-use';

import { WalletListItem } from './WalletListItem';

import Collapse from '../Collapse';

import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import { useTranslation } from '../../contexts/TranslationProvider';
import { useUnifiedWallet, useUnifiedWalletContext } from '../../contexts/UnifiedWalletContext';
import { usePreviouslyConnected } from '../../contexts/WalletConnectionProvider/previouslyConnectedProvider';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import CloseIcon from '../icons/CloseIcon';
import { isMobile, useOutsideClick } from '../../misc/utils';
import { OnboardingFlow } from './Onboarding';

// Material UI imports
import { Box, Typography, Button, IconButton, Divider, Paper, Grid, styled, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotInstalled from './NotInstalled';
import { alpha } from '@mui/material/styles';

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 5,
        py: 6,
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: 'none',
        borderBottom: theme.palette.mode === 'light' ? 1 : 0,
        borderColor: 'divider',
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight="600">
          {t(`Connect Wallet`)}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            color: theme.palette.mode === 'light' 
              ? alpha(theme.palette.common.black, 0.5)
              : alpha(theme.palette.common.white, 0.5),
          }}
        >
          {t(`You need to connect a Solana wallet.`)}
        </Typography>
      </Box>

      <IconButton 
        size="small" 
        onClick={onClose} 
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        <CloseIcon sx={{ width: 12, height: 12 }} />
      </IconButton>
    </Box>
  );
};

const ListOfWallets: React.FC<{
  list: {
    highlightedBy: HIGHLIGHTED_BY;
    highlight: Adapter[];
    others: Adapter[];
  };
  onToggle: (nextValue?: any) => void;
  isOpen: boolean;
}> = ({ list, onToggle, isOpen }) => {
  const { handleConnectClick, walletlistExplanation } = useUnifiedWalletContext();
  const { t } = useTranslation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showNotInstalled, setShowNotInstalled] = useState<Adapter | false>(false);

  const onClickWallet = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, adapter: Adapter) => {
    if (adapter.readyState === WalletReadyState.NotDetected) {
      setShowNotInstalled(adapter);
      return;
    }
    handleConnectClick(event, adapter);
  }, []);

  const renderWalletList = useMemo(
    () => (
      <Box>
        <Grid container spacing={2} sx={{ mt: 4, pb: 4 }} translate="no">
          {list.others.map((adapter, index) => (
            <Grid item xs={6} key={index}>
              <WalletListItem handleClick={(e) => onClickWallet(e, adapter)} wallet={adapter} />
            </Grid>
          ))}
        </Grid>

        {list.highlightedBy !== 'Onboarding' && walletlistExplanation ? (
          <Typography
            variant="caption"
            fontWeight="600"
            sx={{
              textDecoration: 'underline',
              mb: list.others.length > 6 ? 8 : 0,
            }}
          >
            <a href={walletlistExplanation.href} target="_blank" rel="noopener noreferrer">
              {t(`Can't find your wallet?`)}
            </a>
          </Typography>
        ) : null}
      </Box>
    ),
    [handleConnectClick, list.others],
  );

  const hasNoWallets = useMemo(() => {
    return list.highlight.length === 0 && list.others.length === 0;
  }, [list]);

  useEffect(() => {
    if (hasNoWallets) {
      setShowOnboarding(true);
    }
  }, [hasNoWallets]);

  if (showOnboarding) {
    return <OnboardingFlow showBack={!hasNoWallets} onClose={() => setShowOnboarding(false)} />;
  }

  if (showNotInstalled) {
    return (
      <NotInstalled
        adapter={showNotInstalled}
        onClose={() => setShowNotInstalled(false)}
        onGoOnboarding={() => {
          setShowOnboarding(true);
          setShowNotInstalled(false);
        }}
      />
    );
  }

  return (
    <>
      <Box 
        className="hideScrollbar" 
        sx={{ 
          pt: 3, 
          pb: 8, 
          px: 5, 
          position: 'relative', 
          mb: isOpen ? 7 : 0,
          overflowY: 'auto',
          maxHeight: '70vh',
        }}
      >
        {list.highlightedBy !== 'Onboarding' && (
          <Typography variant="caption" fontWeight="600" sx={{ mt: 6 }}>
            {list.highlightedBy === 'PreviouslyConnected' ? t(`Recently used`) : null}
            {list.highlightedBy === 'TopAndRecommended' ? t(`Recommended wallets`) : null}
          </Typography>
        )}

        <Box>
          <Grid container spacing={2} sx={{ mt: 4, pb: 4 }} translate="no">
            {list.highlight.map((adapter, index) => (
              <Grid item xs={6} key={index}>
                <WalletListItem handleClick={(e) => onClickWallet(e, adapter)} wallet={adapter} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {list.others.length > 0 ? (
          <>
            <Button
              variant="text"
              fullWidth
              sx={{
                mt: 5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: (theme) => theme.palette.text.primary,
              }}
              onClick={onToggle}
            >
              <Typography variant="caption" fontWeight="600">
                {t(`More wallets`)}
              </Typography>
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>

            {isOpen && renderWalletList}
          </>
        ) : null}
      </Box>
    </>
  );
};

const PRIORITISE: {
  [value in WalletReadyState]: number;
} = {
  [WalletReadyState.Installed]: 1,
  [WalletReadyState.Loadable]: 2,
  [WalletReadyState.NotDetected]: 3,
  [WalletReadyState.Unsupported]: 3,
};
export interface WalletModalProps {
  className?: string;
  logo?: ReactNode;
  container?: string;
}

type HIGHLIGHTED_BY =
  | 'PreviouslyConnected' // last connected
  | 'TopAndRecommended' // Installed, and top wallets
  | 'Onboarding'
  | 'TopWallet';
const TOP_WALLETS: WalletName[] = [
  'Jupiter Mobile' as WalletName<'Jupiter Mobile'>,
  'Phantom' as WalletName<'Phantom'>,
  'Solflare' as WalletName<'Solflare'>,
  'Backpack' as WalletName<'Backpack'>,
];

interface IUnifiedWalletModal {
  onClose: () => void;
}

const sortByPrecedence = (walletPrecedence: WalletName[]) => (a: Adapter, b: Adapter) => {
  if (!walletPrecedence) return 0;

  const aIndex = walletPrecedence.indexOf(a.name);
  const bIndex = walletPrecedence.indexOf(b.name);

  if (aIndex === -1 && bIndex === -1) return 0;
  if (aIndex >= 0) {
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  }

  if (bIndex >= 0) {
    if (aIndex === -1) return 1;
    return bIndex - aIndex;
  }
  return 0;
};

const UnifiedWalletModal: React.FC<IUnifiedWalletModal> = ({ onClose }) => {
  const { wallets } = useUnifiedWallet();
  const { walletPrecedence, walletModalAttachments } = useUnifiedWalletContext();
  const [isOpen, onToggle] = useToggle(false);
  const previouslyConnected = usePreviouslyConnected();

  const list: { highlightedBy: HIGHLIGHTED_BY; highlight: Adapter[]; others: Adapter[] } = useMemo(() => {
    // Then, Installed, Top 3, Loadable, NotDetected
    const filteredAdapters = wallets.reduce<{
      previouslyConnected: Adapter[];
      installed: Adapter[];
      top3: Adapter[];
      loadable: Adapter[];
      notDetected: Adapter[];
    }>(
      (acc, wallet) => {
        const adapterName = wallet.adapter.name;

        // Previously connected takes highest
        const previouslyConnectedIndex = previouslyConnected.indexOf(adapterName);
        if (previouslyConnectedIndex >= 0) {
          acc.previouslyConnected[previouslyConnectedIndex] = wallet.adapter;
          return acc;
        }
        // Then Installed
        if (wallet.readyState === WalletReadyState.Installed) {
          acc.installed.push(wallet.adapter);
          return acc;
        }
        // Top 3
        const topWalletsIndex = TOP_WALLETS.indexOf(adapterName);
        if (topWalletsIndex >= 0) {
          acc.top3[topWalletsIndex] = wallet.adapter;
          return acc;
        }
        // Loadable
        if (wallet.readyState === WalletReadyState.Loadable) {
          acc.loadable.push(wallet.adapter);
          return acc;
        }
        // NotDetected
        if (wallet.readyState === WalletReadyState.NotDetected) {
          acc.loadable.push(wallet.adapter);
          return acc;
        }
        return acc;
      },
      {
        previouslyConnected: [],
        installed: [],
        top3: [],
        loadable: [],
        notDetected: [],
      },
    );

    if (filteredAdapters.previouslyConnected.length > 0) {
      const { previouslyConnected, ...rest } = filteredAdapters;

      const highlight = filteredAdapters.previouslyConnected.slice(0, 3);
      let others = Object.values(rest)
        .flat()
        .sort((a, b) => PRIORITISE[a.readyState] - PRIORITISE[b.readyState])
        .sort(sortByPrecedence(walletPrecedence || []));
      others.unshift(...filteredAdapters.previouslyConnected.slice(3, filteredAdapters.previouslyConnected.length));
      others = others.filter(Boolean);

      return {
        highlightedBy: 'PreviouslyConnected',
        highlight,
        others,
      };
    }

    if (filteredAdapters.installed.length > 0) {
      const { installed, top3, ...rest } = filteredAdapters;
      const highlight = [...installed.slice(0, 3), ...top3.filter(Boolean)].filter(Boolean);

      const others = Object.values(rest)
        .flat()
        .sort((a, b) => PRIORITISE[a.readyState] - PRIORITISE[b.readyState])
        .sort(sortByPrecedence(walletPrecedence || []));
      others.unshift(...filteredAdapters.installed.slice(3, filteredAdapters.installed.length));

      return { highlightedBy: 'TopAndRecommended', highlight, others };
    }

    if (filteredAdapters.loadable.length === 0) {
      return { highlightedBy: 'Onboarding', highlight: [], others: [] };
    }

    const { top3, ...rest } = filteredAdapters;
    const others = Object.values(rest)
      .flat()
      .sort((a, b) => PRIORITISE[a.readyState] - PRIORITISE[b.readyState])
      .sort(sortByPrecedence(walletPrecedence || []));
    return { highlightedBy: 'TopWallet', highlight: top3, others };
  }, [wallets, previouslyConnected]);

  const contentRef = useRef<HTMLDivElement>(null);
  useOutsideClick(contentRef, onClose);

  return (
    <Paper 
      elevation={3}
      sx={{
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden'
      }}
      ref={contentRef}
    >
      <Header onClose={onClose} />
      <Divider />
      <ListOfWallets list={list} onToggle={onToggle} isOpen={isOpen} />

      {walletModalAttachments?.footer ? <>{walletModalAttachments?.footer}</> : null}
    </Paper>
  );
};

export default UnifiedWalletModal;
