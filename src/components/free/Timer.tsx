import { useState, useEffect } from 'react';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end date to February 21st, 2025 at 16:00 (4:00 PM)
    const endDate = new Date('2025-02-21T16:00:00+01:00'); // +01:00 for German timezone

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      // If the countdown is over
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex gap-4 bg-white rounded-lg shadow-md p-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-indigo-600">{timeLeft.days}</div>
        <div className="text-xs text-gray-500">Tage</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-indigo-600">{timeLeft.hours}</div>
        <div className="text-xs text-gray-500">Std</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-indigo-600">{timeLeft.minutes}</div>
        <div className="text-xs text-gray-500">Min</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-indigo-600">{timeLeft.seconds}</div>
        <div className="text-xs text-gray-500">Sek</div>
      </div>
    </div>
  );
}