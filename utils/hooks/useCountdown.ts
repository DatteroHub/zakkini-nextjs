"use client";
import { useState, useEffect, useCallback } from "react";

const useCountdown = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // If timeout do nothing
    if (!isActive || timeLeft === 0) return;

    // Update timer every second
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean: delete the interval at timeout or at component unmount
    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  const startCountdown = useCallback(() => {
    setIsActive(true);
    setTimeLeft(initialTime);
  }, []);

  return { timeLeft, startCountdown };
};

export default useCountdown;
