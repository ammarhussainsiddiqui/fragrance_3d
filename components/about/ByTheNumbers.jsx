'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Extract numeric value and suffix
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/^\d+/, '');

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;
    const endValue = numericValue;

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Ease-out function
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOutProgress * (endValue - startValue) + startValue);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  {
    value: '12',
    title: 'Numbered Editions',
    description: 'Composed since the house was founded'
  },
  {
    value: '40+',
    title: 'Rare Naturals',
    description: 'Sourced from a small circle of growers'
  },
  {
    value: '100%',
    title: 'Hand Finished',
    description: 'Every flacon numbered in the atelier'
  },
  {
    value: '60+',
    title: 'Boutiques',
    description: 'Stocking the collection worldwide'
  },
  {
    value: '18',
    title: 'Months',
    description: 'Average time to compose an edition'
  },
  {
    value: '100%',
    title: 'Refillable',
    description: 'Glass and metal, nothing else'
  }
];

export default function ByTheNumbers({ stats, heading, paragraph }) {
  return (
    <section className="relative w-full py-16 md:py-24 bg-ink overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-normal text-ivory mb-5">{heading}</h2>
          <p className="text-taupe font-light text-lg max-w-3xl mx-auto">
            {paragraph}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-ink-soft/60 p-6 md:p-8 rounded-xl border border-ivory/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-display text-4xl md:text-5xl text-champagne mb-3 text-center">
                <AnimatedNumber value={stat.value} />
              </div>
              <h3 className="font-sans text-sm uppercase tracking-[0.18em] text-ivory mb-2 text-center">
                {stat.title}
              </h3>
              <p className="text-taupe font-light text-sm md:text-base text-center">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
