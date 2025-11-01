import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Grid,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import ProjectCard from '../components/projects/ProjectCard';
import CreateProjectModal from '../components/projects/CreateProjectModal';
import LoadingSpinner from '@shared/components/LoadingSpinner';
import { projectsAPI } from '../utils/api';
import { useProject } from '../contexts/ProjectContext';
import { NOTIFICATIONS, ROUTES } from '../utils/constants';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, updateProjects, addProject, removeProject } = useProject();
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      updateProjects(data);
    } catch (error) {
      showNotification(NOTIFICATIONS.ERROR_NETWORK, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await projectsAPI.create({
        ...projectData,
        status: 'draft',
        total_items: 0,
        labeled_items: 0,
        quality: 0,
        created_at: new Date().toISOString()
      });

      addProject(newProject);
      setCreateModalOpen(false);
      showNotification(NOTIFICATIONS.PROJECT_CREATED, 'success');

      // Navigate to upload page for new project
      setTimeout(() => {
        navigate(`${ROUTES.UPLOAD}?project=${newProject.id}`);
      }, 1000);
    } catch (error) {
      showNotification(NOTIFICATIONS.ERROR_GENERIC, 'error');
    }
  };

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      await projectsAPI.delete(projectToDelete);
      removeProject(projectToDelete);
      showNotification(NOTIFICATIONS.PROJECT_DELETED, 'success');
    } catch (error) {
      showNotification(NOTIFICATIONS.ERROR_GENERIC, 'error');
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  return (
    <MainLayout title="My Projects">
      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h1">My Projects</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateModalOpen(true)}
            size="large"
          >
            New Project
          </Button>
        </Box>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} lg={4} key={project.id}>
                <ProjectCard project={project} onDelete={handleDeleteClick} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 2
            }}
          >
            <Typography
              sx={{
                fontSize: '64px',
                mb: 2
              }}
            >
              📁
            </Typography>
            <Typography variant="h2" sx={{ mb: 1 }}>
              No projects yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Create your first project to start cleaning data!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setCreateModalOpen(true)}
            >
              Create Project
            </Button>
          </Box>
        )}
      </Box>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Project?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
    </MainLayout>
  );
};

export default ProjectsPage;
