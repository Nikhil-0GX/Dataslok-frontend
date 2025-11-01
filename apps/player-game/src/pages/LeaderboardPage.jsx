import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

// Mock leaderboard data
const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Alex Chen', avatar: 'A', xp: 45890, tasks: 2340, accuracy: 96.5 },
  { rank: 2, name: 'Sarah Kim', avatar: 'S', xp: 42150, tasks: 2180, accuracy: 95.2 },
  { rank: 3, name: 'Mike Johnson', avatar: 'M', xp: 38720, tasks: 2050, accuracy: 94.8 },
  { rank: 4, name: 'Emma Davis', avatar: 'E', xp: 35420, tasks: 1920, accuracy: 93.5 },
  { rank: 5, name: 'James Wilson', avatar: 'J', xp: 32180, tasks: 1850, accuracy: 92.8 }
];

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState(0);

  const getRankColor = (rank) => {
    if (rank === 1) return '#FBBF24'; // Gold
    if (rank === 2) return '#D1D5DB'; // Silver
    if (rank === 3) return '#F97316'; // Bronze
    return 'transparent';
  };

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
        {/* Title */}
        <Typography variant="h1" sx={{ mb: 3, textAlign: 'center' }}>
          🏆 Leaderboard
        </Typography>

        {/* Timeframe Tabs */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Tabs value={timeframe} onChange={(e, newValue) => setTimeframe(newValue)}>
            <Tab label="Today" />
            <Tab label="This Week" />
            <Tab label="All Time" />
          </Tabs>
        </Box>

        {/* Current User Highlight */}
        <Card
          sx={{
            mb: 3,
            backgroundColor: '#F3F0FF',
            border: '2px solid #7C3AED'
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ textAlign: 'center', color: '#7C3AED', fontWeight: 600 }}>
              You're ranked #47 with 1,250 XP
            </Typography>
          </CardContent>
        </Card>

        {/* Leaderboard Table */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Player</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>XP</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Tasks</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Accuracy</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_LEADERBOARD.map((player) => (
                  <TableRow
                    key={player.rank}
                    sx={{
                      backgroundColor: getRankColor(player.rank),
                      '&:hover': {
                        backgroundColor: player.rank <= 3 ? getRankColor(player.rank) : '#F5F5F5'
                      }
                    }}
                  >
                    <TableCell>
                      <Typography variant="h3" sx={{ fontSize: '18px' }}>
                        #{player.rank}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#7C3AED',
                            fontWeight: 600
                          }}
                        >
                          {player.avatar}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {player.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {player.xp.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {player.tasks.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {player.accuracy}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Box>
  );
};

export default LeaderboardPage;
