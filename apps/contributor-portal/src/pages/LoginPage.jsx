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
  Link,
  Divider,
  Alert,
  Snackbar,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, validateDisplayName } from '@shared/utils/validation';
import { ROUTES } from '../utils/constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, signup, loginWithGoogle, loginWithGitHub } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Sign In Form
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInErrors, setSignInErrors] = useState({});

  // Sign Up Form
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpDisplayName, setSignUpDisplayName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [user, navigate]);

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSignInErrors({});

    // Validation
    const errors = {};
    if (!validateEmail(signInEmail)) {
      errors.email = 'Invalid email address';
    }
    if (!signInPassword) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    setLoading(true);
    const result = await login(signInEmail, signInPassword);
    setLoading(false);

    if (result.success) {
      showNotification('Welcome back!', 'success');
      navigate(ROUTES.DASHBOARD);
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpErrors({});

    // Validation
    const errors = {};
    if (!validateDisplayName(signUpDisplayName)) {
      errors.displayName = 'Display name must be 2-50 characters';
    }
    if (!validateEmail(signUpEmail)) {
      errors.email = 'Invalid email address';
    }
    const passwordValidation = validatePassword(signUpPassword);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.message;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!agreedToTerms) {
      errors.terms = 'You must agree to the terms and conditions';
    }

    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }

    setLoading(true);
    const result = await signup(signUpEmail, signUpPassword, signUpDisplayName);
    setLoading(false);

    if (result.success) {
      showNotification('Account created successfully!', 'success');
      navigate(ROUTES.DASHBOARD);
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await loginWithGoogle();
    setLoading(false);

    if (result.success) {
      showNotification('Welcome!', 'success');
      navigate(ROUTES.DASHBOARD);
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleGitHubLogin = async () => {
    setLoading(true);
    const result = await loginWithGitHub();
    setLoading(false);

    if (result.success) {
      showNotification('Welcome!', 'success');
      navigate(ROUTES.DASHBOARD);
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
        backgroundColor: '#F7F7F5',
        p: 2
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                display: 'inline-block',
                width: 60,
                height: 60,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                mb: 2
              }}
            >
              ⚗️
            </Box>
            <Typography variant="h2" sx={{ mb: 0.5 }}>
              Data Alchemist
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contributor Portal
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          {/* Sign In Form */}
          {tabValue === 0 && (
            <form onSubmit={handleSignIn}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                error={!!signInErrors.email}
                helperText={signInErrors.email}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                error={!!signInErrors.password}
                helperText={signInErrors.password}
                sx={{ mb: 2 }}
              />
              <Link
                href="#"
                sx={{
                  fontSize: '14px',
                  color: '#6B46C1',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          )}

          {/* Sign Up Form */}
          {tabValue === 1 && (
            <form onSubmit={handleSignUp}>
              <TextField
                fullWidth
                label="Display Name"
                value={signUpDisplayName}
                onChange={(e) => setSignUpDisplayName(e.target.value)}
                error={!!signUpErrors.displayName}
                helperText={signUpErrors.displayName}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                error={!!signUpErrors.email}
                helperText={signUpErrors.email}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                error={!!signUpErrors.password}
                helperText={signUpErrors.password}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={signUpConfirmPassword}
                onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                error={!!signUpErrors.confirmPassword}
                helperText={signUpErrors.confirmPassword}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to Terms & Conditions
                  </Typography>
                }
                sx={{ mb: 2 }}
              />
              {signUpErrors.terms && (
                <Typography variant="caption" color="error" sx={{ display: 'block', mb: 2 }}>
                  {signUpErrors.terms}
                </Typography>
              )}
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

          {/* Social Login */}
          <Divider sx={{ my: 3 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{ mb: 1.5 }}
          >
            Continue with Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={handleGitHubLogin}
            disabled={loading}
            sx={{
              backgroundColor: '#24292e',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1a1f23'
              }
            }}
          >
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
