import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, Grid } from '@mui/material';

import ExampleBaseOnly from '../components/examples/ExampleBaseOnly';
import { AllLanguage, DEFAULT_LANGUAGE, LANGUAGE_LABELS, OTHER_LANGUAGES } from '../contexts/TranslationProvider/i18n';

const Index = () => {
  const [lang, setLang] = useState<AllLanguage>('en');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
                Unified Wallet Kit
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  px: 2,
                }}
              >
                Unified Wallet Kit is an open-sourced, the Swiss Army Knife wallet adapter.
                <br />
                Easiest integration for devs, Best experience for users.
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
                    {/* {(['light', 'dark', 'jupiter'] as IUnifiedTheme[]).map((t) => (
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
                    ))} */}
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
                Base with Wallet Standard only
              </Typography>
              <Box sx={{ mt: 3 }}>{/* <ExampleBaseOnly lang={lang} /> */}</Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;
