import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Folder as FolderIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../utils/constants';

const SIDEBAR_WIDTH = 240;

const Sidebar = ({ open, onClose, variant = 'permanent' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: ROUTES.DASHBOARD
    },
    {
      title: 'Projects',
      icon: <FolderIcon />,
      path: ROUTES.PROJECTS
    },
    {
      title: 'Upload Data',
      icon: <UploadIcon />,
      path: ROUTES.UPLOAD
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      path: ROUTES.SETTINGS
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}
        >
          ⚗️
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            background: 'linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Data Alchemist
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, pt: 2, px: 1.5 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: '8px',
                  py: 1.25,
                  px: 1.5,
                  backgroundColor: isActive ? '#F3F0FF' : 'transparent',
                  color: isActive ? '#6B46C1' : '#666666',
                  '&:hover': {
                    backgroundColor: isActive ? '#F3F0FF' : '#F5F5F5'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 40
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '15px',
                    fontWeight: isActive ? 600 : 500
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* User Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#6B46C1',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              color: '#1A1A1A',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {user?.displayName || 'User'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              color: '#666666',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block'
            }}
          >
            {user?.email}
          </Typography>
        </Box>
        <IconButton
          onClick={handleLogout}
          size="small"
          sx={{
            color: '#666666',
            '&:hover': {
              backgroundColor: '#F5F5F5',
              color: '#EF4444'
            }
          }}
        >
          <LogoutIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          border: 'none',
          borderRight: '1px solid #E5E5E5'
        }
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
