'use client';

import { motion } from 'framer-motion';

export default function CallToAction({
  heading,
  brandName,
  tagline,
 brandLink
}) {
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto my-20 px-8 py-12 md:py-16 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full">
        <div
          className="w-full rounded-3xl border border-champagne/40 bg-ink-soft/50 p-10 md:p-14 relative"
        >
          <div className="text-center space-y-5">
            {/* Main heading */}
            <h1 className="font-display text-ivory text-2xl md:text-3xl font-normal leading-relaxed">{heading}</h1>

            {/* Brand name */}
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-champagne">
              {brandName}

            </p>

            {/* Tagline */}
            <p className="text-taupe text-sm font-light italic font-display text-base">{tagline}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
