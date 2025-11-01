import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

/**
 * Sign in with GitHub
 */
export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

/**
 * Get current user synchronously
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Get user ID token for API calls
 */
export const getUserToken = async () => {
  const user = getCurrentUser();
  if (user) {
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error('Error getting user token:', error);
      return null;
    }
  }
  return null;
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Parse Firebase errors to user-friendly messages
 */
export const handleAuthError = (error) => {
  const errorCode = error.code;

  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try signing in instead.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled.';
    case 'auth/weak-password':
      return 'Password should be at least 8 characters long.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a few minutes and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email but different sign-in method.';
    default:
      return error.message || 'An error occurred during authentication.';
  }
};

export { auth };
export default app;
