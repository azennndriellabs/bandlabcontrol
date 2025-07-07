import { useState, useCallback, useRef } from 'react';
import { BotStatus, LogEntry } from '../types';

export const useBotStatus = () => {
  const [status, setStatus] = useState<BotStatus>({
    isRunning: false,
    currentStep: 'Idle',
    progress: 0,
    totalIterations: 0,
    completedIterations: 0,
    errors: 0,
    likes: 0,
    comments: 0
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = useCallback((level: LogEntry['level'], message: string, details?: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level,
      message,
      details
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep only last 100 logs
  }, []);

  const startBot = useCallback((totalIterations: number) => {
    setStatus(prev => ({
      ...prev,
      isRunning: true,
      currentStep: 'Starting browser...',
      progress: 0,
      totalIterations,
      completedIterations: 0,
      errors: 0,
      likes: 0,
      comments: 0,
      startTime: new Date()
    }));

    addLog('info', 'Bot started', `Running ${totalIterations} iterations`);

    // Simulate bot execution steps
    const steps = [
      { step: 'Starting browser...', duration: 2000 },
      { step: 'Navigating to BandLab...', duration: 1500 },
      { step: 'Logging in...', duration: 3000 },
      { step: 'Handling popup...', duration: 1000 },
      { step: 'Processing feed...', duration: 0 } // This will loop
    ];

    let currentStepIndex = 0;
    let currentIteration = 0;

    const executeStep = () => {
      if (!status.isRunning && currentStepIndex > 0) return;

      const currentStepData = steps[currentStepIndex];
      
      setStatus(prev => ({
        ...prev,
        currentStep: currentStepData.step
      }));

      addLog('info', currentStepData.step);

      if (currentStepIndex < steps.length - 1) {
        setTimeout(() => {
          currentStepIndex++;
          executeStep();
        }, currentStepData.duration);
      } else {
        // Start the main loop
        intervalRef.current = setInterval(() => {
          if (currentIteration >= totalIterations) {
            stopBot();
            return;
          }

          currentIteration++;
          const isLike = Math.random() > 0.3; // 70% chance of like, 30% error/skip
          
          setStatus(prev => ({
            ...prev,
            currentStep: `Processing post ${currentIteration}/${totalIterations}`,
            progress: (currentIteration / totalIterations) * 100,
            completedIterations: currentIteration,
            likes: isLike ? prev.likes + 1 : prev.likes,
            errors: !isLike ? prev.errors + 1 : prev.errors
          }));

          if (isLike) {
            addLog('success', `Liked post ${currentIteration}`, 'Post interaction successful');
          } else {
            addLog('warning', `Skipped post ${currentIteration}`, 'Post already liked or not available');
          }
        }, 2000);
      }
    };

    executeStep();
  }, [addLog, status.isRunning]);

  const stopBot = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setStatus(prev => ({
      ...prev,
      isRunning: false,
      currentStep: 'Stopped',
      progress: 100
    }));

    addLog('info', 'Bot stopped', 'Execution completed');
  }, [addLog]);

  const resetStatus = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setStatus({
      isRunning: false,
      currentStep: 'Idle',
      progress: 0,
      totalIterations: 0,
      completedIterations: 0,
      errors: 0,
      likes: 0,
      comments: 0
    });

    setLogs([]);
    addLog('info', 'Status reset', 'All counters and logs cleared');
  }, [addLog]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    status,
    logs,
    startBot,
    stopBot,
    resetStatus,
    clearLogs,
    addLog
  };
};