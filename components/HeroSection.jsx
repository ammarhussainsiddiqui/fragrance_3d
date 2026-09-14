'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import PerfumeBottle from './PerfumeBottle';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { brand } from '../lib/brand';

export function HeroSection(
  {
    title = "Eau de Parfum",
    description = "Numbered eaux de parfum composed in small editions — rare naturals, quiet structure, and a trail that lingers.",
    ctaLabel = "Discover the Collection",
    // ctaHref = "/",
    // backgroundVideoSrc = "/videos/hero-bg.mp4",
  }
) {
  const router = useRouter();
  const [modelScale, setModelScale] = useState(1.4);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);

  const textAnimation = {
    initial: { '--x': '50%', '--y': '50%' },
    animate: {
      '--x': ['40%', '60%', '40%'],
      '--y': ['40%', '60%', '40%'],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      bottomLeftRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'easeOut',
      }
    ).fromTo(
      bottomRightRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.5'
    );
  }, []);

  // Handle responsive model scale
  useEffect(() => {
    const handleResize = () => {
      setModelScale(window.innerWidth < 768 ? 2.8 : 1.4);
    };

    // Set initial scale
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden bg-ink mb-10">
      <div className="relative w-full h-full">
        <video
          style={{ transform: 'rotate(2deg) scale(1.56)', filter: 'grayscale(1) sepia(0.45) brightness(0.6) contrast(1.15)', mixBlendMode: 'screen' }}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain z-0"
        >
          <source src="/videos/Pink-hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-ink to-transparent z-5"></div>
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center w-full pt-1 sm:pt-0">
        <motion.h1
          className="font-display italic font-normal text-[4.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] text-center select-none w-full px-4"
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={textAnimation.transition}
          style={{
            background: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: '#f4efe6',
            WebkitTextFillColor: '#f4efe6',
            WebkitTextStroke: '1px #f4efe6',
            lineHeight: '0.95',
            letterSpacing: '-0.01em',
          }}
        >
          <div className="flex justify-center items-center">
            <span>{brand.mark}</span>
          </div>
        </motion.h1>
      </div>
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center"
        initial={textAnimation.initial}
        animate={textAnimation.animate}
        transition={textAnimation.transition}
      >
        <div className="w-[16rem] h-[26rem] md:w-[22rem] md:h-[36rem] lg:w-[28rem] lg:h-[44rem] xl:w-[34rem] xl:h-[54rem]">
          <Canvas
            // dpr={window.devicePixelRatio}
            camera={{ position: [0, 1.6, 12], fov: 35 }}
            style={{ width: "100%", height: "100%" }}
            gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
          >
            <ambientLight intensity={0.35} />
            <directionalLight position={[5, 10, 10]} intensity={1.4} color="#fff6e8" />
            <directionalLight position={[-5, 8, -5]} intensity={0.8} color="#cdb98e" />

            <PerfumeBottle
              variant="amber"
              scale={1.8}
              position={[0, 0, 0]}
              rotation={[0, 0, -0.35]}
              quality="high"
            />
          </Canvas>


        </div>
      </motion.div>
      <div className="absolute inset-0 z-30 flex items-center justify-center w-full pt-1 sm:pt-0">
        <motion.h1
          className="font-display italic font-normal text-[4.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] text-center select-none w-full px-4"
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={textAnimation.transition}
          style={{
            background: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1px rgba(244,239,230,0.75)',
            lineHeight: '0.95',
            letterSpacing: '-0.01em',
          }}
        >
          <div className="flex justify-center items-center">
            <span>{brand.mark}</span>
          </div>
        </motion.h1>
      </div>
      <div
        ref={bottomLeftRef}
        className="absolute bottom-42 sm:bottom-14 xl:bottom-8 left-4 right-4 sm:left-8 md:left-16 lg:left-24 max-w-md mx-auto sm:mx-0 space-y-4 sm:space-y-6 z-40 px-4 sm:px-0"
      >
        <p
          className="text-xs sm:text-sm md:text-base text-ivory/80 font-light leading-relaxed text-center sm:text-left"
        >
          {description}
        </p>
        <div className="flex justify-center sm:justify-start">
          <button
            className="btn-primary group w-full sm:w-auto"
            onClick={() => router.push('/contact')}
          >
            <span>{ctaLabel}</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ rotate: -35 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </button>
        </div>
      </div>
      <div ref={bottomRightRef} className="absolute bottom-98  right-4 sm:right-8 md:right-10 lg:right-20 z-40">
        <h2
          className="font-sans text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.4em] text-champagne text-center sm:text-right"
        >
          {title}
        </h2>
      </div>
    </section>
  );
}
