import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Container, Paper, Grid, Theme, ThemeProvider, createTheme } from '@mui/material';
import { Cluster } from '@solana/web3.js';

import { AllLanguage, DEFAULT_LANGUAGE, LANGUAGE_LABELS, OTHER_LANGUAGES } from '../contexts/TranslationProvider/i18n';
import { UnifiedWalletProvider } from '../contexts/UnifiedWalletProvider';
import { UnifiedWalletButton } from '../components/UnifiedWalletButton';
import WalletNotification, { NotificationManager } from '../components/WalletNotification';
import PreviewFunctionality from '../components/PreviewFunctionality';
import Collapse from '../components/Collapse';
import { useWallet } from '@solana/wallet-adapter-react';

const Index = () => {
  const [lang, setLang] = useState<AllLanguage>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [expanded, setExpanded] = useState(false);
  
  const muiTheme = useMemo(() => 
    createTheme({
      palette: {
        mode: theme,
      },
    }), [theme]
  );

  // Configuration for the wallet provider
  const walletConfig = useMemo(() => ({
    autoConnect: false,
    env: 'mainnet-beta' as Cluster,
    metadata: {
      name: 'UnifiedWallet Demo',
      description: 'Unified Wallet Kit Demo Page',
      url: 'https://jup.ag',
      iconUrls: ['https://jup.ag/favicon.ico'],
    },
    notificationCallback: WalletNotification,
    walletlistExplanation: {
      href: 'https://station.jup.ag/docs/additional-topics/wallet-list',
    },
    theme: muiTheme,
    lang,
  }), [muiTheme, lang]);

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Box>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 4, md: 8 },
                pb: 6,
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2rem', md: '3.25rem' },
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  MUI Unified Wallet Kit
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    px: 2,
                  }}
                >
                  MUI Unified Wallet Kit is a fork of the Unified Wallet Kit with built in MUI styles.
                  <br />
                  Because we dispensed with inline styles in the early 1990's.
                </Typography>
              </Box>

              <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        pb: 1,
                        mb: 2,
                        fontWeight: 600,
                        textAlign: 'center',
                        borderBottom: '1px solid',
                      }}
                    >
                      Theme
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center',
                      }}
                    >
                      {(['light', 'dark'] as const).map((t) => (
                        <Button
                          key={t}
                          variant={theme === t ? 'contained' : 'outlined'}
                          onClick={() => setTheme(t)}
                          sx={{
                            textTransform: 'capitalize',
                            minWidth: '100px',
                          }}
                        >
                          {t}
                        </Button>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        borderBottom: '1px solid',
                        pb: 1,
                        mb: 2,
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      Language
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center',
                      }}
                    >
                      {[DEFAULT_LANGUAGE, ...OTHER_LANGUAGES].map((l) => (
                        <Button
                          key={l}
                          variant={lang === l ? 'contained' : 'outlined'}
                          onClick={() => setLang(l)}
                          sx={{
                            textTransform: 'capitalize',
                            minWidth: '100px',
                          }}
                        >
                          {LANGUAGE_LABELS[l]}
                        </Button>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Paper
                elevation={3}
                sx={{
                  mt: 6,
                  p: 4,
                  width: '100%',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Basic Wallet Connection
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <UnifiedWalletProvider wallets={[]} config={walletConfig}>
                    <UnifiedWalletButton />
                  </UnifiedWalletProvider>
                </Box>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  mt: 4,
                  p: 4,
                  width: '100%',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Additional Components Demo
                </Typography>
                
                <Button 
                  variant="outlined" 
                  onClick={() => setExpanded(!expanded)}
                  sx={{ mb: 2 }}
                >
                  {expanded ? 'Hide' : 'Show'} More Components
                </Button>
                
                <Collapse 
                  height="0" 
                  maxHeight="500px" 
                  expanded={expanded}
                >
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                          CurrentUserBadge (Disconnected State)
                        </Typography>
                        <Box sx={{ background: '#f0f0f0', p: 2, borderRadius: 1 }}>
                          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                            This component shows connected wallet info
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                          Wallet Preview
                        </Typography>
                        <UnifiedWalletProvider wallets={[]} config={walletConfig}>
                          <WalletPreviewWithDetails />
                        </UnifiedWalletProvider>
                      </Paper>
                    </Grid>
                  </Grid>
                </Collapse>
              </Paper>
            </Box>
          </Container>
        </Box>
        <NotificationManager />
      </Box>
    </ThemeProvider>
  );
};

// Add this component to use the wallet context and display details
const WalletPreviewWithDetails = () => {
  const walletContext = useWallet();
  
  return (
    <>
      <UnifiedWalletButton />
      {walletContext.connected ? (
        <Box sx={{ mt: 2 }}>
          <PreviewFunctionality 
            title="Wallet Details"
            walletProps={walletContext}
          />
        </Box>
      ) : (
        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Connect a wallet to see details
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Index;
