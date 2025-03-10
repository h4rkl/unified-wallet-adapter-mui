import React from 'react';
import { useRef, useState } from 'react';
import { HARDCODED_WALLET_STANDARDS } from '../../misc/constants';
import ExternalIcon from '../icons/ExternalIcon';
import { useTranslation } from '../../contexts/TranslationProvider';

// Material UI imports
import { Box, Typography, Button, Stack } from '@mui/material';

export const OnboardingIntro: React.FC<{
  setFlow: (flow: IOnboardingFlow) => void;
  onClose: () => void;
  showBack: boolean;
}> = ({ setFlow, onClose, showBack }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 10 }}>
      <img src={'https://unified.jup.ag/new_user_onboarding.png'} width={160} height={160} alt="Onboarding" />

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="600">
          {t(`New here?`)}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 3, 
            color: (theme) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.5)' 
          }}
        >
          {t(`Welcome to DeFi! Create a crypto wallet to get started!`)}
        </Typography>
      </Box>

      <Box sx={{ mt: 6, width: '100%' }}>
        <Button
          onClick={() => setFlow('Get Wallet')}
        >
          {t(`Get Started`)}
        </Button>
      </Box>
      
      {showBack && (
        <Button
          variant="text"
          sx={{ 
            mt: 3,
            fontSize: '0.75rem',
            fontWeight: '600',
            color: (theme) =>  theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
          }}
          onClick={() => onClose()}
        >
          {'← ' + t(`Go back`)}
        </Button>
      )}
    </Box>
  );
};

export const OnboardingGetWallets: React.FC<{ flow: IOnboardingFlow; setFlow: (flow: IOnboardingFlow) => void }> = ({
  flow,
  setFlow,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 3, px: 10 }}>
      <Typography variant="body1" fontWeight="600">
        {t(`Popular wallets to get started`)}
      </Typography>
      
      <Stack spacing={2} sx={{ mt: 4, width: '100%' }}>
        {HARDCODED_WALLET_STANDARDS.map((item, idx) => (
          <Button
            key={idx}
            component="a"
            href={item.url}
            target="_blank"
          >
            <img src={item.icon} width={20} height={20} alt={item.name} />
            <span>{item.name}</span>
          </Button>
        ))}

        <Button
          component="a"
          href={'https://station.jup.ag/partners?category=Wallets'}
          target="_blank"
        >
          <Box sx={{ 
            width: 20, 
            height: 20, 
            display: 'flex', 
            alignItems: 'center', 
            padding: '2px',
            color: (theme) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
          }}>
            <ExternalIcon width={16} height={16} />
          </Box>
          <span>{t(`More wallets`)}</span>
        </Button>
      </Stack>

      <Typography
        variant="caption"
        align="center"
        sx={{
          mt: 3,
          color: (theme) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
        }}
      >
        {t(`Once installed, refresh this page`)}
      </Typography>
      
      <Button
        variant="text"
        sx={{ 
          mt: 3,
          fontSize: '0.75rem',
          fontWeight: '600',
          color: (theme) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
        }}
        onClick={() => setFlow('Onboarding')}
      >
        {'← ' + t(`Go back`)}
      </Button>
    </Box>
  );
};

export type IOnboardingFlow = 'Onboarding' | 'Get Wallet';
export const OnboardingFlow = ({ onClose, showBack }: { onClose: () => void; showBack: boolean }) => {
  const [flow, setFlow] = useState<IOnboardingFlow>('Onboarding');
  const [animateOut, setAnimateOut] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const setFlowAnimated = (flow: IOnboardingFlow) => {
    setAnimateOut(true);

    setTimeout(() => {
      contentRef.current?.scrollTo(0, 0);
      setAnimateOut(false);
      setFlow(flow);
    }, 200);
  };

  return (
    <Box
      ref={contentRef}
      sx={{
        animation: animateOut ? 'fadeOut 0.2s' : 'fadeIn 0.5s',
        opacity: animateOut ? 0 : 1,
        overflowY: 'scroll',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        '@keyframes fadeOut': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      }}
      className="hideScrollbar"
    >
      {flow === 'Onboarding' ? (
        <OnboardingIntro showBack={showBack} setFlow={setFlowAnimated} onClose={onClose} />
      ) : null}
      {flow === 'Get Wallet' ? <OnboardingGetWallets flow={flow} setFlow={setFlowAnimated} /> : null}
    </Box>
  );
};
