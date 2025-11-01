import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { Download as DownloadIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import MainLayout from '../components/layout/MainLayout';
import LoadingSpinner from '@shared/components/LoadingSpinner';
import { dashboardAPI } from '../utils/api';
import { CHART_COLORS, DASHBOARD_REFRESH_RATE } from '../utils/constants';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsCard = ({ label, value, change, icon }) => (
  <Card>
    <CardContent>
      <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 1 }}>
        {label}
      </Typography>
      <Typography variant="h1" sx={{ mb: 1 }}>
        {value}
      </Typography>
      {change && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TrendingUpIcon sx={{ fontSize: 16, color: '#10B981' }} />
          <Typography variant="body2" sx={{ color: '#10B981' }}>
            {change}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, DASHBOARD_REFRESH_RATE);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock project ID - in real app, get from URL params or context
      const projectId = 'demo-project';
      const data = await dashboardAPI.getStats(projectId);
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      await dashboardAPI.downloadData('demo-project');
    } catch (error) {
      console.error('Error downloading data:', error);
    }
  };

  // Mock data for demo
  const qualityOverTimeData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'AI Method',
        data: [65, 72, 78, 85, 89, 92],
        borderColor: CHART_COLORS.AI_METHOD,
        backgroundColor: 'rgba(107, 70, 193, 0.1)',
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: 'Random Method',
        data: [45, 52, 58, 62, 64, 66],
        borderColor: CHART_COLORS.RANDOM_METHOD,
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        borderDash: [5, 5]
      }
    ]
  };

  const comparisonData = {
    labels: ['Alchemist AI', 'Random'],
    datasets: [
      {
        data: [92, 66],
        backgroundColor: [CHART_COLORS.AI_METHOD, CHART_COLORS.RANDOM_METHOD]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: CHART_COLORS.GRID_COLOR
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  if (loading) {
    return (
      <MainLayout title="Dashboard">
        <LoadingSpinner />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Dashboard">
      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h1" sx={{ mb: 0.5 }}>
              Project Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Real-time data quality monitoring and AI performance comparison
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined">Pause Project</Button>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
              Download Data
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <StatsCard label="Total Labels" value="2,847" change="↑ 12% from yesterday" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard label="Data Quality" value="87%" change="↑ 5% improvement" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard label="Active Players" value="42" change="↑ 8 new today" />
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 3 }}>
                  Quality Over Time
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Line data={qualityOverTimeData} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 3 }}>
                  AI vs Random Assignment
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Bar
                    data={comparisonData}
                    options={{
                      ...chartOptions,
                      indexAxis: 'y',
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default DashboardPage;
