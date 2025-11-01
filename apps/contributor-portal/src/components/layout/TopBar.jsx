import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

const TopBar = ({ title, onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onMenuClick}
            sx={{ mr: 2, color: '#1A1A1A' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Page Title */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '20px', sm: '24px' },
            fontWeight: 600,
            color: '#1A1A1A',
            flex: 1
          }}
        >
          {title}
        </Typography>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notifications */}
          <IconButton
            sx={{
              color: '#666666',
              '&:hover': {
                backgroundColor: '#F5F5F5'
              }
            }}
          >
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
