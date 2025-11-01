import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithGitHub,
  signOut,
  resetPassword,
  onAuthStateChange
} from '@shared/utils/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /**
   * Login with email and password
   */
  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    const result = await signInWithEmail(email, password);

    if (result.success) {
      setUser(result.user);
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  /**
   * Sign up with email, password, and display name
   */
  const signup = async (email, password, displayName) => {
    setError(null);
    setLoading(true);

    const result = await signUpWithEmail(email, password, displayName);

    if (result.success) {
      setUser(result.user);
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  /**
   * Login with Google OAuth
   */
  const loginWithGoogle = async () => {
    setError(null);
    setLoading(true);

    const result = await signInWithGoogle();

    if (result.success) {
      setUser(result.user);
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  /**
   * Login with GitHub OAuth
   */
  const loginWithGitHub = async () => {
    setError(null);
    setLoading(true);

    const result = await signInWithGitHub();

    if (result.success) {
      setUser(result.user);
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  /**
   * Logout current user
   */
  const logout = async () => {
    setError(null);
    const result = await signOut();

    if (result.success) {
      setUser(null);
      return { success: true };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  /**
   * Send password reset email
   */
  const sendPasswordReset = async (email) => {
    setError(null);
    const result = await resetPassword(email);

    if (result.success) {
      return { success: true, message: 'Password reset email sent!' };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    loginWithGoogle,
    loginWithGitHub,
    logout,
    sendPasswordReset,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
