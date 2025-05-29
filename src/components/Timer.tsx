import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  initialTime?: number; // in seconds
  onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime = 25 * 60, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-card rounded-lg shadow-sm border">
      <div className="text-4xl font-bold font-mono">{formatTime(timeLeft)}</div>
      <div className="flex gap-2">
        <Button
          variant={isRunning ? "destructive" : "default"}
          onClick={toggleTimer}
          className="w-20"
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRunning ? 'توقف' : 'شروع'}
        </Button>
        <Button
          variant="outline"
          onClick={resetTimer}
          className="w-20"
        >
          <RotateCcw className="h-4 w-4" />
          ریست
        </Button>
      </div>
    </div>
  );
};

export default Timer; 