// src/ClimateClock.js
import React, { useState, useEffect } from "react";
import moment from "moment";

const targetDate = new Date("2029-07-21T16:00:00Z");

const ClimateClock = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-green-400">
      <h1 className="text-4xl font-bold mb-4">🌍 Climate Clock</h1>
      <div className="text-6xl font-mono  bg-gray-800 p-6 rounded-lg shadow-lg">
        {timeLeft.years}y {timeLeft.days}d&nbsp;
        {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Time left until the global temperature increases by 1.5°C
      </p>
    </div>
  );
};

const calculateTimeLeft = () => {
  const now = new Date();
  const difference = targetDate - now;

  const timeLeft = {};

  if (difference > 0) {
    timeLeft.years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    const yearRemainder = difference % (1000 * 60 * 60 * 24 * 365);
    timeLeft.days = Math.floor(yearRemainder / (1000 * 60 * 60 * 24));
    timeLeft.hours = Math.floor((yearRemainder / (1000 * 60 * 60)) % 24);
    timeLeft.minutes = Math.floor((yearRemainder / (1000 * 60)) % 60);
    timeLeft.seconds = Math.floor((yearRemainder / 1000) % 60);
  }

  return timeLeft;
};

export default ClimateClock;
