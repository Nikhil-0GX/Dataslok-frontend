import axios from 'axios';
import { getUserToken } from '@shared/utils/firebase';
import { API_BASE_URL } from './constants';

/**
 * Axios instance for API calls
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request interceptor: Add authentication token
 */
api.interceptors.request.use(
  async (config) => {
    const token = await getUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor: Handle common errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific HTTP status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          window.location.href = '/login';
          break;
        case 429:
          // Rate limited
          console.error('Too many requests. Please try again later.');
          break;
        case 500:
          console.error('Server error. Please try again later.');
          break;
        default:
          break;
      }
    } else if (error.request) {
      // Network error
      console.error('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  }
);

/**
 * Projects API
 */
export const projectsAPI = {
  /**
   * Get all projects for current user
   */
  getAll: async () => {
    const response = await api.get('/api/projects');
    return response.data;
  },

  /**
   * Get a single project by ID
   */
  getById: async (projectId) => {
    const response = await api.get(`/api/projects/${projectId}`);
    return response.data;
  },

  /**
   * Create a new project
   */
  create: async (projectData) => {
    const response = await api.post('/api/projects', projectData);
    return response.data;
  },

  /**
   * Update a project
   */
  update: async (projectId, updates) => {
    const response = await api.patch(`/api/projects/${projectId}`, updates);
    return response.data;
  },

  /**
   * Delete a project
   */
  delete: async (projectId) => {
    const response = await api.delete(`/api/projects/${projectId}`);
    return response.data;
  }
};

/**
 * Upload API
 */
export const uploadAPI = {
  /**
   * Upload dataset file
   */
  uploadFile: async (file, projectId, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);

    const response = await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      }
    });

    return response.data;
  },

  /**
   * Create labeling task
   */
  createTask: async (projectId, taskData) => {
    const response = await api.post(`/api/projects/${projectId}/task`, taskData);
    return response.data;
  }
};

/**
 * Dashboard API
 */
export const dashboardAPI = {
  /**
   * Get dashboard statistics for a project
   */
  getStats: async (projectId) => {
    const response = await api.get(`/api/dashboard/${projectId}`);
    return response.data;
  },

  /**
   * Download labeled data
   */
  downloadData: async (projectId) => {
    const response = await api.get(`/api/projects/${projectId}/download`, {
      responseType: 'blob'
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `project_${projectId}_data.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true };
  }
};

/**
 * User API
 */
export const userAPI = {
  /**
   * Get user profile
   */
  getProfile: async () => {
    const response = await api.get('/api/users/me');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (updates) => {
    const response = await api.patch('/api/users/me', updates);
    return response.data;
  }
};

export default api;
