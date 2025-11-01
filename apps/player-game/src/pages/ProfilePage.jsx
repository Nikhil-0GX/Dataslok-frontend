import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';

const StatCard = ({ icon, value, label }) => (
  <Card>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontSize: '32px', mb: 1 }}>{icon}</Typography>
      <Typography variant="h2" sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </CardContent>
  </Card>
);

const AchievementBadge = ({ icon, title, unlocked }) => (
  <Card
    sx={{
      opacity: unlocked ? 1 : 0.4,
      filter: unlocked ? 'none' : 'grayscale(100%)'
    }}
  >
    <CardContent sx={{ textAlign: 'center', p: 2 }}>
      <Typography sx={{ fontSize: '48px', mb: 1 }}>{icon}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { score, tasksCompleted, streak } = useGame();

  const accuracy = tasksCompleted > 0 ? 94 : 0; // Mock accuracy
  const bestStreak = Math.max(streak, 12); // Mock best streak

  const achievements = [
    { icon: '🎯', title: 'First Task', unlocked: tasksCompleted >= 1 },
    { icon: '🚀', title: 'Getting Started', unlocked: tasksCompleted >= 10 },
    { icon: '💯', title: 'Century', unlocked: tasksCompleted >= 100 },
    { icon: '🔥', title: 'On Fire', unlocked: bestStreak >= 10 },
    { icon: '⚡', title: 'Speed Demon', unlocked: false },
    { icon: '💎', title: 'Perfectionist', unlocked: accuracy >= 95 }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        pb: 4
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid #E5E7EB',
          p: 2
        }}
      >
        <Box sx={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/play')}
            sx={{ color: '#666666' }}
          >
            Back to Game
          </Button>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
        {/* User Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 96,
              height: 96,
              margin: '0 auto',
              mb: 2,
              backgroundColor: '#7C3AED',
              fontSize: '36px',
              fontWeight: 700
            }}
          >
            {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Typography variant="h1" sx={{ mb: 1 }}>
            {user?.displayName || 'Player'}
          </Typography>
          <Chip label="🏆 Gold Player" color="warning" sx={{ fontWeight: 600 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Member since {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <StatCard icon="🏆" value={score} label="Total XP" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard icon="✅" value={tasksCompleted} label="Tasks Done" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard icon="🎯" value={`${accuracy}%`} label="Accuracy" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard icon="🔥" value={bestStreak} label="Best Streak" />
          </Grid>
        </Grid>

        {/* Achievements */}
        <Typography variant="h2" sx={{ mb: 3 }}>
          Achievements
        </Typography>
        <Grid container spacing={2}>
          {achievements.map((achievement, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              <AchievementBadge {...achievement} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;
