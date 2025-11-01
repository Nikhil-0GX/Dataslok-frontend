import { createTheme } from '@mui/material/styles';

/**
 * Player Game Theme - Duolingo-inspired vibrant gamified design
 * Energetic, rewarding, and fun
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#7C3AED', // Primary Purple
      light: '#8B5CF6',
      dark: '#6B21A8',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#EC4899', // Pink accent
      light: '#F472B6',
      dark: '#DB2777',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#10B981', // Success Green
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#F97316', // Energy Orange (for streaks)
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#EF4444', // Miss Red
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#FBBF24', // XP Gold
      contrastText: '#1A1A1A'
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666'
    }
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: {
      fontSize: '28px',
      fontWeight: 700
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700
    },
    h3: {
      fontSize: '20px',
      fontWeight: 700
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '18px'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 4px 6px rgba(0,0,0,0.1)',
    '0 6px 12px rgba(0,0,0,0.15)',
    '0 8px 16px rgba(0,0,0,0.15)',
    '0 10px 24px rgba(0,0,0,0.2)',
    ...Array(19).fill('none')
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '14px 28px',
          fontSize: '18px',
          fontWeight: 700,
          transition: 'all 0.2s ease',
          minHeight: '56px'
        },
        contained: {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)'
          },
          '&:active': {
            transform: 'scale(0.98)'
          }
        },
        outlined: {
          borderWidth: '2px',
          backgroundColor: '#E5E7EB',
          color: '#1A1A1A',
          border: 'none',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: '#D1D5DB'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          transition: 'all 0.2s ease'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 12,
          borderRadius: 6,
          backgroundColor: '#E5E7EB'
        },
        bar: {
          borderRadius: 6,
          background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '14px',
          height: 32
        }
      }
    }
  }
});

export default theme;
