import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';

const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
    {value === index && children}
  </Box>
);

const SettingsPage = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [notifications, setNotifications] = useState({
    newLabels: true,
    milestones: true,
    weeklyReport: false
  });

  const handleSaveProfile = () => {
    // Save profile logic
    console.log('Saving profile:', displayName);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <MainLayout title="Settings">
      <Box>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Settings
        </Typography>

        <Card>
          <CardContent>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="Profile" />
              <Tab label="Notifications" />
              <Tab label="API Keys" />
            </Tabs>

            {/* Profile Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ maxWidth: 600 }}>
                <TextField
                  fullWidth
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={user?.email || ''}
                  disabled
                  helperText="Email cannot be changed"
                  sx={{ mb: 3 }}
                />
                <Button variant="contained" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </Box>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ maxWidth: 600 }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Email Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.newLabels}
                      onChange={() => handleNotificationChange('newLabels')}
                    />
                  }
                  label="New labels received"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.milestones}
                      onChange={() => handleNotificationChange('milestones')}
                    />
                  }
                  label="Project milestones reached"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.weeklyReport}
                      onChange={() => handleNotificationChange('weeklyReport')}
                    />
                  }
                  label="Weekly summary report"
                  sx={{ mb: 2, display: 'block' }}
                />
                <Divider sx={{ my: 3 }} />
                <Button variant="contained">Save Preferences</Button>
              </Box>
            </TabPanel>

            {/* API Keys Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ maxWidth: 600 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  API keys allow you to programmatically access your data.
                </Typography>
                <Button variant="contained">+ Generate New Key</Button>
              </Box>
            </TabPanel>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default SettingsPage;
