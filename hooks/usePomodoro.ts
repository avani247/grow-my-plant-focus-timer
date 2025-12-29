import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, TimerSettings } from '../types';
import { TOTAL_SESSIONS_BEFORE_LONG_BREAK } from '../constants';
import { playTick, playFocusEnd, playBreakEnd } from '../utils/sound';

export const usePomodoro = (settings: TimerSettings) => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.FOCUS);
  const [timeLeft, setTimeLeft] = useState(settings[TimerMode.FOCUS]);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);
  
  const timerRef = useRef<number | null>(null);

  // NOTE: We deliberately DO NOT listen for settings changes to auto-update timeLeft.
  // This ensures that if the user changes settings while a timer is running (or paused),
  // the current session remains intact. The new settings only apply when:
  // 1. The session ends and switches mode.
  // 2. The user manually clicks "Reset".

  // Handle Mode Switching logic
  const switchMode = useCallback(() => {
    const finishedMode = mode;
    let nextMode = TimerMode.FOCUS;
    let nextSessionCount = sessionCount;

    if (mode === TimerMode.FOCUS) {
      if (sessionCount >= TOTAL_SESSIONS_BEFORE_LONG_BREAK) {
        nextMode = TimerMode.LONG_BREAK;
      } else {
        nextMode = TimerMode.SHORT_BREAK;
      }
    } else if (mode === TimerMode.SHORT_BREAK) {
      nextMode = TimerMode.FOCUS;
      nextSessionCount = sessionCount + 1;
    } else if (mode === TimerMode.LONG_BREAK) {
      nextMode = TimerMode.FOCUS;
      nextSessionCount = 1;
    }

    // Stop timer
    setIsActive(false);
    
    // Update state - This picks up the LATEST settings
    setMode(nextMode);
    setTimeLeft(settings[nextMode]);
    setSessionCount(nextSessionCount);

    // Play Sound
    if (settings.enableSessionEndSound) {
      if (finishedMode === TimerMode.FOCUS) {
        playFocusEnd();
      } else {
        playBreakEnd();
      }
    }
  }, [mode, sessionCount, settings]);

  // Watch for Timer Completion (The safest way to handle 0)
  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      switchMode();
    }
  }, [timeLeft, isActive, switchMode]);

  // The Tick
  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 0) return 0;
      if (settings.enableTickSound) {
        playTick();
      }
      return prev - 1;
    });
  }, [settings.enableTickSound]);

  // Interval Handling
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(tick, 1000);
    } else if (timeLeft === 0) {
      // Clear interval immediately if 0
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, tick, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      // If pressing start at 0, reset current mode with latest settings
      setTimeLeft(settings[mode]);
    }
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    // This is the manual way for a user to force-apply new settings to the current mode
    setTimeLeft(settings[mode]);
  };

  return {
    mode,
    timeLeft,
    isActive,
    sessionCount,
    toggleTimer,
    resetTimer,
  };
};
