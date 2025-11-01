import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import { PROJECT_TYPES } from '../../utils/constants';
import { validateProjectName } from '@shared/utils/validation';

const EMOJI_OPTIONS = ['📁', '🎯', '🔬', '📊', '💡', '🎨', '📸', '📝', '🚀', '⚡'];

const CreateProjectModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'custom',
    icon: '📁'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    // Validation
    const newErrors = {};
    const nameValidation = validateProjectName(formData.name);
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    await onSubmit(formData);
    setLoading(false);

    // Reset form
    setFormData({
      name: '',
      description: '',
      type: 'custom',
      icon: '📁'
    });
    setErrors({});
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        description: '',
        type: 'custom',
        icon: '📁'
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Project Name */}
          <TextField
            fullWidth
            label="Project Name"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name || 'Give your project a descriptive name'}
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            helperText="Optional - Describe what this project is about"
          />

          {/* Project Type */}
          <TextField
            select
            fullWidth
            label="Project Type"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            {PROJECT_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Icon Picker */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Choose an icon
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {EMOJI_OPTIONS.map((emoji) => (
                <Box
                  key={emoji}
                  onClick={() => handleChange('icon', emoji)}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '8px',
                    border: '2px solid',
                    borderColor: formData.icon === emoji ? '#6B46C1' : '#E5E5E5',
                    backgroundColor: formData.icon === emoji ? '#F3F0FF' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#6B46C1',
                      backgroundColor: '#F3F0FF'
                    }
                  }}
                >
                  {emoji}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !formData.name.trim()}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProjectModal;
