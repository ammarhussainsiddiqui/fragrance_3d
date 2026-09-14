'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set launch date to 30 days from now
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date('2025-01-31') - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    };

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) return;

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center mx-2">
        <span className="font-display text-4xl md:text-6xl text-ivory">
          {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
        </span>
        <span className="font-sans text-[11px] md:text-xs text-taupe uppercase tracking-[0.25em] mt-2">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-ivory p-4">

      <main className="text-center max-w-4xl mx-auto mt-22">
        <p className="eyebrow mb-6">The Collection</p>
        <h1 className="font-display text-4xl md:text-6xl font-normal pb-8 text-ivory italic">
          Coming Soon
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-taupe font-light">
          A new edition is resting in the atelier. It will be numbered soon.
        </p>

        <div className="flex justify-center my-12">
          {timerComponents.length ? (
            <div className="flex">
              {timerComponents}
            </div>
          ) : (
            <p className="font-display italic text-xl text-champagne">Now available</p>
          )}
        </div>

        <div className="mt-8">
          <p className="text-base mb-6 text-taupe font-light">Be the first to know when it leaves the atelier.</p>
        </div>
      </main>


    </div>
  );
}
