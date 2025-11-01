import { createTheme } from '@mui/material/styles';

/**
 * Contributor Portal Theme - Notion-inspired professional design
 * Clean, modern, and data-focused
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#6B46C1', // Primary Purple
      light: '#9F7AEA', // Purple Light
      lightest: '#F3F0FF', // Purple Lightest (for backgrounds)
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1A1A1A', // Text Primary
      light: '#666666', // Text Secondary
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#10B981', // Success Green
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#F59E0B', // Warning Orange
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#EF4444', // Error Red
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#3B82F6', // Info Blue
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F7F7F5', // Off-white, Notion-style
      paper: '#FFFFFF' // White cards
    },
    divider: '#E5E5E5', // Subtle borders
    text: {
      primary: '#1A1A1A', // Headings, important text
      secondary: '#666666' // Body text, labels
    }
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: {
      fontSize: '32px',
      fontWeight: 600,
      color: '#1A1A1A'
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#1A1A1A'
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1A1A1A'
    },
    body1: {
      fontSize: '15px',
      fontWeight: 400,
      color: '#1A1A1A'
    },
    body2: {
      fontSize: '13px',
      fontWeight: 400,
      color: '#666666'
    },
    button: {
      textTransform: 'none', // Don't uppercase buttons
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 8 // Rounded corners
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.08)', // Subtle shadow
    '0 2px 6px rgba(0,0,0,0.08)',
    '0 4px 12px rgba(0,0,0,0.10)',
    '0 6px 16px rgba(0,0,0,0.10)',
    '0 8px 24px rgba(0,0,0,0.12)',
    ...Array(19).fill('none') // Fill rest with none
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
          fontSize: '15px',
          fontWeight: 500,
          transition: 'all 0.2s ease'
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
          }
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '1px solid #E5E5E5',
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover fieldset': {
              borderColor: '#6B46C1'
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1A1A1A',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E5E5E5'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '13px'
        }
      }
    }
  }
});

export default theme;
