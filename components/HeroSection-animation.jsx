'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import PerfumeBottle from './PerfumeBottle';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';
import { useRouter } from 'next/navigation';
import { brand } from '../lib/brand';

gsap.registerPlugin(ScrollTrigger);

export function HeroSectionAnimation({
  title = "Eau de Parfum",
  description = "Numbered eaux de parfum composed in small editions — rare naturals, quiet structure, and a trail that lingers long after you have left the room.",
  ctaLabel = "Discover the Collection",
  title2 = "The House",
  description2 = "Maison Sillage composes fragrance the way a couturier cuts cloth: with restraint, precision and an obsession with material. Each edition is built around a single rare natural and finished by hand.",
  features = [
    { title: "Rare Naturals", description: "Sourced from a small circle of growers and distillers" },
    { title: "Composed by Hand", description: "Every edition finished and numbered in our atelier" },
    { title: "Lasting Sillage", description: "Concentrated extraits with a trail that lingers" },
    { title: "Considered Craft", description: "Refillable flacons in glass and metal, nothing else" },
  ],
}) {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const modalRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);
  const videoRef = useRef(null);


  const scrollerRef = useContext(ScrollerContext);
  const router = useRouter();

  // Original Text Animation Config
  const textAnimation = {
    initial: { '--x': '50%', '--y': '50%' },
    animate: {
      '--x': ['40%', '60%', '40%'],
      '--y': ['40%', '60%', '40%'],
    },
    transition: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
  };


  useEffect(() => {
    if (!modalRef.current) return;
    const scroller = scrollerRef?.current || window;

    // Create matchMedia instance
    let mm = gsap.matchMedia();

    mm.add({
      // Screen size definitions
      isLarge: "(min-width: 1537px)", // Desktop / LED
      isLaptop: "(max-width: 1536px)" // Laptop and smaller
    }, (context) => {
      // Extract the condition
      const { isLarge } = context.conditions;

      // Initial Setup
      gsap.set(modalRef.current, {
        position: 'fixed',
        top: '50%',
        left: '45%',
        x: '-38%',
        y: '-42%',
        scale: 1.1,
        rotation: 320,
        opacity: 1,
        zIndex: 30,
        width: 550,
        height: 550,
        pointerEvents: 'none',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section1Ref.current,
          scroller: scroller,
          start: "top top",
          endTrigger: section2Ref.current,
          scrub: 0.8,
          immediateRender: false,
        }
      });

      // Move to Section 2
      tl.to(modalRef.current, {
        // Logic: 25% if screen is Large, 5% if Laptop
        x: isLarge ? '25%' : '5%',
        y: '-45%',
        rotation: 360,
        // Increased scale slightly for laptop to prevent the "small" look
        scale: isLarge ? 1.3 : 1.2,
        ease: "none",
      })
        // Move to Section 3 (Exit)
        .to(modalRef.current, {
          x: '150%',
          y: '30%',
          opacity: 0,
          scale: 1,
          ease: "none",
        });
    });

    // Cleanup: mm.revert() handles killing all scrollTriggers and resets styles
    return () => mm.revert();
  }, [scrollerRef]);
  /* ----------------------------------
     UI ENTRANCE (Bottom Content)
  ---------------------------------- */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // 0.5 = half speed
    }
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(bottomLeftRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    ).fromTo(bottomRightRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  return (
    <main className='scroll-smooth bg-ink no-scrollbar overflow-x-hidden' style={{ zIndex: -9999, pointerEvents: 'all' }}>

      {/* ================= 3D MODEL CONTAINER ================= */}
      <div ref={modalRef} className="will-change-transform" style={{ pointerEvents: 'none' }}>
        <Canvas
          shadows
          style={{ pointerEvents: 'none' }}
          gl={{ antialias: true, alpha: true }}
          // the wrapper is rotated/scaled by GSAP; measure its untransformed box
          resize={{ offsetSize: true }}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[8, 8, 10]} intensity={1.4} color="#fff6e8" />
          <directionalLight position={[-6, 3, -4]} intensity={0.8} color="#cdb98e" />

          <PerfumeBottle
            variant="amber"
            scale={2}
            position={[0, 0, 0]}
            quality="high"
          />
        </Canvas>
      </div>

      {/* ================= SECTION 1 ================= */}
      <section ref={section1Ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-ink mb-10">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            style={{ transform: 'rotate(2deg) scale(0.8)', filter: 'grayscale(1) sepia(0.45) brightness(0.6) contrast(1.15)', mixBlendMode: 'screen' }}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-contain z-0"
          >
            <source src="/videos/Pink-hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-ink to-transparent z-5"></div>
        </div>

        {/* Dual Layered Headers */}
        {[1, 2].map((layer) => (
          <div key={layer} className={`absolute inset-0 flex items-center justify-center w-full pt-1 sm:pt-0 ${layer === 1 ? 'z-10' : 'z-30'}`}>
            <motion.h1
              className="font-display italic font-normal text-[4.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] text-center select-none w-full px-4"
              initial={textAnimation.initial}
              animate={textAnimation.animate}
              transition={textAnimation.transition}
              style={{
                background: 'transparent',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: layer === 1 ? '#f4efe6' : 'transparent',
                WebkitTextFillColor: layer === 1 ? '#f4efe6' : 'transparent',
                WebkitTextStroke: layer === 1 ? '1px #f4efe6' : '1px rgba(244,239,230,0.75)',
                lineHeight: '0.95',
                letterSpacing: '-0.01em',
              }}
            >
              <div className="flex justify-center items-center">
                <span>{brand.mark}</span>
              </div>
            </motion.h1>
          </div>
        ))}

        {/* Bottom Left UI */}
        <div ref={bottomLeftRef} className="absolute bottom-10 left-4 sm:left-16 lg:left-24 max-w-md z-40 space-y-6">
          <p className="text-sm md:text-base text-ivory/80 leading-relaxed font-light">{description}</p>
          <button
            className="btn-primary pointer-events-auto group"
            onClick={() => router.push('/contact')}
          >
            <span>{ctaLabel}</span>
            <motion.svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ rotate: -35 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></motion.svg>
          </button>
        </div>
{/* bottom-38 sm:bottom-38 md:bottom-41 right-10 */}
        {/* Bottom Right Title */}
        <div ref={bottomRightRef} className="absolute mt-60 ml-[50vw] z-30">
          <h2 className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-champagne">{title}</h2>
        </div>
      </section>

      {/* ================= SECTION 2 ================= */}
      <section ref={section2Ref} className="flex h-screen w-full items-center px-16 bg-ink text-ivory relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
          <div>
            <h2 className="font-display text-5xl font-normal mb-6">{title2}</h2>
            <p className="text-[16px] text-taupe font-light leading-relaxed">{description2}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-2 pointer-events-auto">
                  <div className="p-2 rounded-full text-champagne border border-champagne/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24">
                      {index === 0 && <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                      {index === 1 && <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      {index === 2 && <path d="M13 10V3L4 14h7v7l9-11h-7z" />}
                      {index === 3 && <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />}
                      {index === 4 && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                      {index === 5 && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-sans text-sm uppercase tracking-[0.18em] text-ivory">{feature.title}</h4>
                    <p className="text-taupe text-sm mt-2 font-light">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-screen bg-no-repeat bg-center bg-contain opacity-50 lg:opacity-100" style={{ backgroundImage: "url('/images/11.png')" }} />
        </div>
      </section>

      {/* ================= SECTION 3 ================= */}
      <section ref={section3Ref} className="flex items-center justify-center bg-ink text-ink">
        <h2 className="text-4xl font-bold">More Content Here</h2>
      </section>
    </main>
  );
}
