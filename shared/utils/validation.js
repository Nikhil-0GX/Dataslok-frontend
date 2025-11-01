/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {{valid: boolean, message: string}} Validation result
 */
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long'
    };
  }

  if (password.length > 128) {
    return {
      valid: false,
      message: 'Password is too long (max 128 characters)'
    };
  }

  // Check for at least one letter and one number (recommended)
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return {
      valid: true, // Still valid, but show warning
      message: 'For better security, include both letters and numbers',
      warning: true
    };
  }

  return {
    valid: true,
    message: 'Strong password'
  };
};

/**
 * Validate display name
 * @param {string} name - Display name to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateDisplayName = (name) => {
  if (!name) return false;

  const trimmed = name.trim();

  // Check length (2-50 characters)
  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Check for invalid characters (allow letters, numbers, spaces, and basic punctuation)
  const validNameRegex = /^[a-zA-Z0-9\s\-_.]+$/;
  return validNameRegex.test(trimmed);
};

/**
 * Sanitize user input
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export const sanitizeInput = (text) => {
  if (typeof text !== 'string') return '';

  return text
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

/**
 * Validate file size
 * @param {number} sizeInBytes - File size in bytes
 * @param {number} maxSizeInMB - Maximum allowed size in MB
 * @returns {{valid: boolean, message: string}} Validation result
 */
export const validateFileSize = (sizeInBytes, maxSizeInMB = 50) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (sizeInBytes > maxSizeInBytes) {
    return {
      valid: false,
      message: `File size exceeds ${maxSizeInMB}MB limit`
    };
  }

  return {
    valid: true,
    message: 'File size is acceptable'
  };
};

/**
 * Validate file type
 * @param {string} fileName - File name
 * @param {string[]} allowedTypes - Array of allowed file extensions
 * @returns {{valid: boolean, message: string}} Validation result
 */
export const validateFileType = (fileName, allowedTypes = ['.csv', '.json']) => {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));

  if (!allowedTypes.includes(extension)) {
    return {
      valid: false,
      message: `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`
    };
  }

  return {
    valid: true,
    message: 'File type is acceptable'
  };
};

/**
 * Validate project name
 * @param {string} name - Project name to validate
 * @returns {{valid: boolean, message: string}} Validation result
 */
export const validateProjectName = (name) => {
  if (!name || name.trim().length < 3) {
    return {
      valid: false,
      message: 'Project name must be at least 3 characters long'
    };
  }

  if (name.length > 100) {
    return {
      valid: false,
      message: 'Project name must not exceed 100 characters'
    };
  }

  return {
    valid: true,
    message: ''
  };
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
