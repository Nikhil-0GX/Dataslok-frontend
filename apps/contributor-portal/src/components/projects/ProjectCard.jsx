import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { STATUS_COLORS, ROUTES } from '../../utils/constants';

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = () => {
    navigate(`${ROUTES.DASHBOARD}?project=${project.id}`);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    handleMenuClose();
    onDelete(project.id);
  };

  const labeledPercentage = project.total_items > 0
    ? Math.round((project.labeled_items / project.total_items) * 100)
    : 0;

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '8px',
              backgroundColor: '#F3F0FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              mr: 2
            }}
          >
            {project.icon || '📁'}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h3"
              sx={{
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {project.name}
            </Typography>
            <Chip
              label={project.status.toUpperCase()}
              size="small"
              color={STATUS_COLORS[project.status]}
              sx={{ height: 20, fontSize: '11px' }}
            />
          </Box>
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{ ml: 1 }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Stats Preview */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            mb: 2
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', mb: 0.5 }}>
              Total Items
            </Typography>
            <Typography variant="h3" sx={{ fontSize: '18px' }}>
              {project.total_items || 0}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', mb: 0.5 }}>
              Labeled
            </Typography>
            <Typography variant="h3" sx={{ fontSize: '18px' }}>
              {project.labeled_items || 0}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', mb: 0.5 }}>
              Quality
            </Typography>
            <Typography variant="h3" sx={{ fontSize: '18px', color: '#10B981' }}>
              {project.quality || 0}%
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }}>
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }}>
              {labeledPercentage}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={labeledPercentage}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#E5E5E5',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#6B46C1',
                borderRadius: 3
              }
            }}
          />
        </Box>

        {/* Footer */}
        <Typography variant="caption" color="text.secondary">
          Created {new Date(project.created_at || Date.now()).toLocaleDateString()}
        </Typography>
      </CardContent>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleCardClick}>
          <DashboardIcon sx={{ mr: 1, fontSize: 20 }} />
          View Dashboard
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default ProjectCard;
