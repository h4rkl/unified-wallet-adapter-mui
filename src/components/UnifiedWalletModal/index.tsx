import { Adapter, WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'react-use';

import { WalletIcon, WalletListItem } from './WalletListItem';

import Collapse from '../Collapse';

import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import { useTranslation } from '../../contexts/TranslationProvider';
import { IStandardStyle, useUnifiedWallet, useUnifiedWalletContext } from '../../contexts/UnifiedWalletContext';
import { usePreviouslyConnected } from '../../contexts/WalletConnectionProvider/previouslyConnectedProvider';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import CloseIcon from '../icons/CloseIcon';
import { isMobile, useOutsideClick } from '../../misc/utils';
import { OnboardingFlow } from './Onboarding';

// Material UI imports
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Paper,
  Grid,
  styled,
  useTheme,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Styled components with MUI
const ModalContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'theme',
})<{ customtheme: 'light' | 'dark' | 'jupiter' }>(({ theme, customtheme }) => ({
  maxWidth: '500px',
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  maxHeight: '90vh',
  [theme.breakpoints.up('lg')]: {
    maxHeight: '576px',
  },
  transition: 'height 500ms ease-in-out',
  ...(customtheme === 'light' && {
    backgroundColor: '#ffffff',
    color: '#000000',
    boxShadow: theme.shadows[10],
  }),
  ...(customtheme === 'dark' && {
    backgroundColor: '#3A3B43',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }),
  ...(customtheme === 'jupiter' && {
    backgroundColor: 'rgb(49, 62, 76)',
    color: '#ffffff',
  }),
}));

const BottomShade = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'theme',
})<{ customtheme: 'light' | 'dark' | 'jupiter' }>(({ theme, customtheme }) => ({
  display: 'block',
  width: '100%',
  height: '80px',
  position: 'absolute',
  left: 0,
  bottom: '28px',
  zIndex: 50,
  pointerEvents: 'none',
  ...(customtheme === 'light' && {
    background: 'linear-gradient(to top, #ffffff, transparent)',
  }),
  ...(customtheme === 'dark' && {
    background: 'linear-gradient(to top, #3A3B43, transparent)',
  }),
  ...(customtheme === 'jupiter' && {
    background: 'linear-gradient(to top, rgb(49, 62, 76), transparent)',
  }),
}));

const ListContainer = styled(Box)({
  height: '100%',
  overflowY: 'auto',
  paddingTop: '12px',
  paddingBottom: '32px',
  position: 'relative',
  '&.hideScrollbar': {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  },
});

const styles: IStandardStyle = {
  container: {
    light: [],
    dark: [],
    jupiter: [],
  },
  shades: {
    light: [],
    dark: [],
    jupiter: [],
  },
  walletItem: {
    light: [],
    dark: [],
    jupiter: [],
  },
  subtitle: {
    light: [],
    dark: [],
    jupiter: [],
  },
  header: {
    light: [],
    dark: [],
    jupiter: [],
  },
  text: {
    light: [],
    dark: [],
    jupiter: [],
  },
};

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { theme } = useUnifiedWalletContext();
  const { t } = useTranslation();
  const muiTheme = useTheme();

  return (
    <Box
      sx={{
        px: 5,
        py: 6,
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: 'none',
        borderBottom: theme === 'light' ? 1 : 0,
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
            color: theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
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
  const { handleConnectClick, walletlistExplanation, walletAttachments, theme } = useUnifiedWalletContext();
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
              mb: list.others.length > 6 ? 8 : 0
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
      <ListContainer className="hideScrollbar" sx={{ pt: 3, pb: 8, px: 5, position: 'relative', mb: isOpen ? 7 : 0 }}>
        <Typography variant="caption" fontWeight="600" sx={{ mt: 6 }}>
          {list.highlightedBy === 'PreviouslyConnected' ? t(`Recently used`) : null}
          {list.highlightedBy === 'TopAndRecommended' ? t(`Recommended wallets`) : null}
        </Typography>

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
              sx={{ 
                mt: 5, 
                display: 'flex', 
                width: '100%', 
                justifyContent: 'space-between',
                alignItems: 'center',
                color: theme === 'light' ? 'black' : 'white'
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
      </ListContainer>

      {/* Bottom Shades */}
      {isOpen && list.others.length > 6 ? (
        <BottomShade customtheme={theme} />
      ) : null}
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
  const { walletPrecedence, theme, walletModalAttachments } = useUnifiedWalletContext();
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
    <ModalContainer ref={contentRef} customtheme={theme}>
      <Header onClose={onClose} />
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <ListOfWallets list={list} onToggle={onToggle} isOpen={isOpen} />

      {walletModalAttachments?.footer ? <>{walletModalAttachments?.footer}</> : null}
    </ModalContainer>
  );
};

export default UnifiedWalletModal;
