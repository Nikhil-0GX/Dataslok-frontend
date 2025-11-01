import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '@shared/utils/validation';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, signup, loginWithGoogle, loginWithGitHub } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpDisplayName, setSignUpDisplayName] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/play');
    }
  }, [user, navigate]);

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(signInEmail) || !signInPassword) {
      showNotification('Please enter valid credentials', 'error');
      return;
    }

    setLoading(true);
    const result = await login(signInEmail, signInPassword);
    setLoading(false);

    if (result.success) {
      showNotification('Welcome back!', 'success');
      navigate('/play');
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpDisplayName || !validateEmail(signUpEmail) || !signUpPassword) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    setLoading(true);
    const result = await signup(signUpEmail, signUpPassword, signUpDisplayName);
    setLoading(false);

    if (result.success) {
      showNotification('Account created!', 'success');
      navigate('/play');
    } else {
      showNotification(result.error, 'error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        p: 2
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          boxShadow: '0 16px 48px rgba(0,0,0,0.2)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                display: 'inline-block',
                width: 60,
                height: 60,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                mb: 2
              }}
            >
              🎮
            </Box>
            <Typography variant="h2" sx={{ mb: 0.5 }}>
              Data Alchemist
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Play and Earn Points!
            </Typography>
          </Box>

          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered sx={{ mb: 3 }}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          {tabValue === 0 && (
            <form onSubmit={handleSignIn}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 1 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          )}

          {tabValue === 1 && (
            <form onSubmit={handleSignUp}>
              <TextField
                fullWidth
                label="Display Name"
                value={signUpDisplayName}
                onChange={(e) => setSignUpDisplayName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 1 }}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          )}

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={async () => {
              setLoading(true);
              const result = await loginWithGoogle();
              setLoading(false);
              if (result.success) navigate('/play');
              else showNotification(result.error, 'error');
            }}
            disabled={loading}
            sx={{ mb: 1.5 }}
          >
            Continue with Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={async () => {
              setLoading(true);
              const result = await loginWithGitHub();
              setLoading(false);
              if (result.success) navigate('/play');
              else showNotification(result.error, 'error');
            }}
            disabled={loading}
            sx={{
              backgroundColor: '#24292e',
              color: '#fff',
              '&:hover': { backgroundColor: '#1a1f23' }
            }}
          >
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
