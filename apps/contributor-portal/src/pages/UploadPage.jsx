import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import { DATA_TYPES, UPLOAD_CONSTRAINTS } from '../utils/constants';
import { uploadAPI } from '../utils/api';

const UploadPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [taskData, setTaskData] = useState({
    dataField: '',
    dataType: 'text',
    question: '',
    options: ['', '']
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    maxSize: UPLOAD_CONSTRAINTS.MAX_FILE_SIZE_MB * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    }
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleTaskDataChange = (field, value) => {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOption = () => {
    setTaskData((prev) => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...taskData.options];
    newOptions[index] = value;
    setTaskData((prev) => ({ ...prev, options: newOptions }));
  };

  return (
    <MainLayout title="Upload Data">
      <Box>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Upload Your Dataset
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Upload Data</StepLabel>
          </Step>
          <Step>
            <StepLabel>Define Task</StepLabel>
          </Step>
        </Stepper>

        {/* Step 1: Upload Data */}
        {activeStep === 0 && (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h2" sx={{ mb: 1 }}>
                Upload Your Dataset
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Upload a CSV or JSON file containing your data
              </Typography>

              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? '#6B46C1' : '#E5E5E5',
                  borderRadius: '12px',
                  p: 6,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragActive ? '#F3F0FF' : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#6B46C1',
                    backgroundColor: '#F9F8FF'
                  }
                }}
              >
                <input {...getInputProps()} />
                <CloudUploadIcon sx={{ fontSize: 48, color: '#6B46C1', mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {isDragActive ? 'Drop file here' : 'Drag & drop or click to browse'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accepted formats: .csv, .json (max {UPLOAD_CONSTRAINTS.MAX_FILE_SIZE_MB}MB)
                </Typography>
              </Box>

              {selectedFile && (
                <Alert severity="success" sx={{ mt: 3 }}>
                  File selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                </Alert>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!selectedFile}
                  size="large"
                >
                  Next
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Define Task */}
        {activeStep === 1 && (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h2" sx={{ mb: 1 }}>
                Define Labeling Task
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Tell players what question to answer
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Data Type"
                  select
                  value={taskData.dataType}
                  onChange={(e) => handleTaskDataChange('dataType', e.target.value)}
                >
                  {DATA_TYPES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="Question"
                  placeholder="What question should players answer?"
                  value={taskData.question}
                  onChange={(e) => handleTaskDataChange('question', e.target.value)}
                />

                <Box>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    Answer Options (minimum 2)
                  </Typography>
                  {taskData.options.map((option, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      sx={{ mb: 1.5 }}
                    />
                  ))}
                  <Button onClick={handleAddOption} variant="outlined">
                    + Add Option
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button onClick={handleBack} variant="outlined">
                  Back
                </Button>
                <Button
                  variant="contained"
                  disabled={!taskData.question || taskData.options.filter(o => o).length < 2}
                  size="large"
                >
                  Create Task
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </MainLayout>
  );
};

export default UploadPage;
