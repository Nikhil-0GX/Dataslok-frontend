import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [currentTask, setCurrentTask] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [dailyGoal] = useState(20);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, show: false });

  const updateScore = (points) => {
    setScore(prev => prev + points);
  };

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  const incrementTasksCompleted = () => {
    setTasksCompleted(prev => prev + 1);
  };

  const showFeedback = (type) => {
    setFeedback({ type, show: true });
    setTimeout(() => {
      setFeedback({ type: null, show: false });
    }, 800);
  };

  const value = {
    currentTask,
    setCurrentTask,
    score,
    updateScore,
    streak,
    incrementStreak,
    resetStreak,
    tasksCompleted,
    incrementTasksCompleted,
    dailyGoal,
    loading,
    setLoading,
    feedback,
    showFeedback
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameContext;
