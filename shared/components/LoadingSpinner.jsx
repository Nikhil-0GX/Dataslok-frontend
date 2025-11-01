import React from 'react';
import { CircularProgress, Box } from '@mui/material';

/**
 * Reusable loading spinner component
 * @param {Object} props
 * @param {string} props.size - Size of spinner: 'small' (24px), 'medium' (40px), 'large' (60px)
 * @param {string} props.color - Color from theme: 'primary', 'secondary', 'inherit'
 * @param {boolean} props.centered - If true, centers the spinner in its container
 */
const LoadingSpinner = ({ size = 'medium', color = 'primary', centered = true }) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  if (centered) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
          width: '100%'
        }}
      >
        <CircularProgress size={spinnerSize} color={color} />
      </Box>
    );
  }

  return <CircularProgress size={spinnerSize} color={color} />;
};

export default LoadingSpinner;
