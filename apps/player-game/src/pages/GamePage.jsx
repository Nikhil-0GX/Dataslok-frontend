import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Avatar
} from '@mui/material';
import { Whatshot as WhatshotIcon, EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { useGame } from '../contexts/GameContext';
import Confetti from 'react-confetti';
import CountUp from 'react-countup';

// Mock task data
const MOCK_TASKS = [
  {
    id: 1,
    question: 'What do you see in this image?',
    dataType: 'image',
    dataValue: 'https://via.placeholder.com/400x300/6B46C1/FFFFFF?text=Sample+Image',
    options: [
      { label: 'Cat', emoji: '🐱' },
      { label: 'Dog', emoji: '🐶' },
      { label: 'Neither', emoji: '❌' }
    ]
  },
  {
    id: 2,
    question: 'Is this text positive or negative?',
    dataType: 'text',
    dataValue: 'This is an amazing product! I love it!',
    options: [
      { label: 'Positive', emoji: '😊' },
      { label: 'Negative', emoji: '😞' },
      { label: 'Neutral', emoji: '😐' }
    ]
  }
];

const GamePage = () => {
  const {
    score,
    updateScore,
    streak,
    incrementStreak,
    resetStreak,
    tasksCompleted,
    incrementTasksCompleted,
    dailyGoal
  } = useGame();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);

  const currentTask = MOCK_TASKS[currentTaskIndex % MOCK_TASKS.length];
  const progress = Math.min((tasksCompleted / dailyGoal) * 100, 100);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return; // Prevent multiple clicks

    setSelectedAnswer(answer);
    setShowFeedback(true);

    // Simulate correct answer (random for demo)
    const isCorrect = Math.random() > 0.3;
    setFeedbackType(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      updateScore(10);
      incrementStreak();
      incrementTasksCompleted();

      // Check for streak milestone
      if ((streak + 1) % 5 === 0) {
        updateScore(50); // Bonus
        setTimeout(() => {
          setShowStreakCelebration(true);
          setTimeout(() => setShowStreakCelebration(false), 3000);
        }, 800);
      }
    } else {
      resetStreak();
    }

    // Move to next task after delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentTaskIndex(prev => prev + 1);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        pb: 4
      }}
    >
      {/* Streak Celebration */}
      {showStreakCelebration && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              textAlign: 'center',
              animation: 'bounceIn 0.5s ease-out'
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: '48px',
                fontWeight: 800,
                color: '#7C3AED',
                textShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}
            >
              🎉 {streak} Streak! +50 Bonus XP! 🎉
            </Typography>
          </Box>
        </>
      )}

      {/* Score Display */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid #E5E7EB',
          p: 2
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrophyIcon sx={{ color: '#FBBF24', fontSize: 28 }} />
            <Typography variant="h3" sx={{ color: '#FBBF24' }}>
              <CountUp end={score} duration={0.5} /> XP
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WhatshotIcon
              sx={{
                color: '#F97316',
                fontSize: 28,
                animation: streak > 0 ? 'pulse 1s infinite' : 'none'
              }}
            />
            <Typography variant="h3" sx={{ color: '#F97316' }}>
              {streak}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          p: 2,
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', mt: 1, color: '#666666' }}
          >
            {tasksCompleted} / {dailyGoal} tasks completed today
          </Typography>
        </Box>
      </Box>

      {/* Task Card */}
      <Box
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          p: 3
        }}
      >
        <Card
          sx={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            transition: 'transform 0.3s ease',
            transform: showFeedback ? 'scale(0.98)' : 'scale(1)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Question */}
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <span>🎯</span> {currentTask.question}
            </Typography>

            {/* Data Display */}
            <Box
              sx={{
                backgroundColor: '#F5F5F5',
                borderRadius: '12px',
                p: 3,
                mb: 3,
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {currentTask.dataType === 'image' ? (
                <img
                  src={currentTask.dataValue}
                  alt="Task"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px'
                  }}
                />
              ) : (
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: 'center',
                    lineHeight: 1.6,
                    color: '#1A1A1A'
                  }}
                >
                  "{currentTask.dataValue}"
                </Typography>
              )}
            </Box>

            {/* Answer Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {currentTask.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option.label ? 'contained' : 'outlined'}
                  size="large"
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswerClick(option.label)}
                  sx={{
                    height: '64px',
                    fontSize: '18px',
                    justifyContent: 'center',
                    gap: 2,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    },
                    '&:active': {
                      transform: 'scale(0.98)'
                    }
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{option.emoji}</span>
                  {option.label}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Feedback */}
        {showFeedback && (
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9998,
              animation: 'bounceIn 0.5s ease-out',
              textAlign: 'center'
            }}
          >
            {feedbackType === 'correct' ? (
              <>
                <Box
                  sx={{
                    fontSize: '120px',
                    color: '#10B981',
                    animation: 'checkBounce 0.6s ease-out'
                  }}
                >
                  ✓
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    color: '#10B981',
                    fontWeight: 800,
                    animation: 'fadeInUp 0.5s ease-out'
                  }}
                >
                  +10 XP
                </Typography>
              </>
            ) : (
              <Box
                sx={{
                  fontSize: '80px',
                  color: '#EF4444',
                  animation: 'shake 0.4s ease-out'
                }}
              >
                ✗
              </Box>
            )}
          </Box>
        )}

        {/* Streak Bonus Info */}
        {streak > 0 && streak % 5 !== 0 && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: '#F3F0FF',
              border: '2px solid #7C3AED',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <Typography variant="body1" sx={{ color: '#7C3AED', fontWeight: 600 }}>
              ⭐ {5 - (streak % 5)} more correct for +50 bonus XP! ⭐
            </Typography>
          </Box>
        )}
      </Box>

      {/* Animations */}
      <style>
        {`
          @keyframes bounceIn {
            0% { transform: translate(-50%, -50%) scale(0); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }
          @keyframes checkBounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>
    </Box>
  );
};

export default GamePage;
