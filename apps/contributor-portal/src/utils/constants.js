/**
 * Application constants for Contributor Portal
 */

// API endpoints base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  UPLOAD: '/upload',
  SETTINGS: '/settings'
};

// Project types
export const PROJECT_TYPES = [
  { value: 'image-classification', label: 'Image Classification' },
  { value: 'text-categorization', label: 'Text Categorization' },
  { value: 'sentiment-analysis', label: 'Sentiment Analysis' },
  { value: 'custom', label: 'Custom' }
];

// Data types
export const DATA_TYPES = [
  { value: 'image', label: 'Image URLs' },
  { value: 'text', label: 'Text' },
  { value: 'other', label: 'Other' }
];

// File upload constraints
export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE_MB: 50,
  ALLOWED_FILE_TYPES: ['.csv', '.json'],
  ALLOWED_MIME_TYPES: ['text/csv', 'application/json']
};

// Polling intervals (in milliseconds)
export const POLLING_INTERVALS = {
  DASHBOARD: 10000, // 10 seconds
  PROJECT_STATS: 30000 // 30 seconds
};

// Project status values
export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused',
  DRAFT: 'draft'
};

// Status badge colors
export const STATUS_COLORS = {
  active: 'success',
  completed: 'info',
  paused: 'warning',
  draft: 'default'
};

// Chart colors
export const CHART_COLORS = {
  AI_METHOD: '#6B46C1', // Primary Purple
  RANDOM_METHOD: '#9CA3AF', // Gray
  QUALITY_LINE: '#6B46C1',
  GRID_COLOR: '#E5E5E5'
};

// Dashboard refresh rate
export const DASHBOARD_REFRESH_RATE = 10000; // 10 seconds

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'contributor_preferences',
  SELECTED_PROJECT: 'selected_project',
  SIDEBAR_STATE: 'sidebar_state'
};

// Validation rules
export const VALIDATION_RULES = {
  PROJECT_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100
  },
  DESCRIPTION: {
    MAX_LENGTH: 500
  },
  QUESTION: {
    MAX_LENGTH: 200
  },
  ANSWER_OPTION: {
    MIN_OPTIONS: 2,
    MAX_OPTIONS: 10,
    MAX_LENGTH: 100
  }
};

// Notification messages
export const NOTIFICATIONS = {
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_DELETED: 'Project deleted successfully.',
  FILE_UPLOADED: 'File uploaded successfully!',
  TASK_CREATED: 'Task created! Players can now start labeling.',
  DATA_DOWNLOADED: 'Data downloaded successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
  ERROR_GENERIC: 'An error occurred. Please try again.',
  ERROR_NETWORK: 'Network error. Please check your connection.',
  ERROR_UPLOAD: 'File upload failed. Please try again.'
};
