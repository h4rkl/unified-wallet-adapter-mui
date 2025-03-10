import { createTheme, Theme, responsiveFontSizes } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Create a theme instance
const createAppTheme = (mode: PaletteMode): Theme => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#00A661', // Jupiter jungle-green
        contrastText: '#fff'
      },
      secondary: {
        main: '#3A3B43',
        contrastText: '#fff'
      },
      background: {
        default: mode === 'dark' ? '#103145' : '#f5f5f5',
        paper: mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : '#fff'
      },
      text: {
        primary: mode === 'dark' ? '#fff' : '#000',
        secondary: mode === 'dark' ? '#9D9DA6' : '#666'
      },
      v3: {
        bg: 'rgb(49, 62, 76)',
        primary: '#1A1B1F',
      },
      jupiter: {
        jungleGreen: '#00A661',
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
            padding: '8px 16px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '1rem',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
          @keyframes hue {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          .hideScrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hideScrollbar::-webkit-scrollbar {
            display: none;
          }
        `,
      },
    },
  });

  // Add responsive font sizes
  theme = responsiveFontSizes(theme);

  return theme;
};

// Default theme is dark mode
const theme = createAppTheme('dark');

export default theme;

// For type augmentation to allow custom theme properties
declare module '@mui/material/styles' {
  interface Palette {
    v3: {
      bg: string;
      primary: string;
    };
    jupiter: {
      jungleGreen: string;
    };
  }
  interface PaletteOptions {
    v3?: {
      bg: string;
      primary: string;
    };
    jupiter?: {
      jungleGreen: string;
    };
  }
}