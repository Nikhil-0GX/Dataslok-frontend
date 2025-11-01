import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const SIDEBAR_WIDTH = 240;

const MainLayout = ({ children, title = 'Dashboard' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F7F7F5' }}>
      {/* Sidebar */}
      {isMobile ? (
        <Sidebar
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        />
      ) : (
        <Sidebar variant="permanent" />
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          minHeight: '100vh'
        }}
      >
        {/* Top Bar */}
        <TopBar title={title} onMenuClick={handleDrawerToggle} />

        {/* Content */}
        <Box
          sx={{
            mt: { xs: 7, sm: 8 },
            p: { xs: 2, sm: 3, md: 4 }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
