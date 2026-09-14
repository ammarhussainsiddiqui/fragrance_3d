'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import PerfumeBottle from './PerfumeBottle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';
import { motion, useAnimation } from 'framer-motion';
import { brand } from '../lib/brand';

export function FinalSection() {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  useEffect(() => {
    if (!scrollerRef?.current) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: scrollerRef.current,
          start: 'top center',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(sectionRef.current);
    };
  }, [scrollerRef]);

  const textAnimation = {
    '--x': '50%',
    '--y': '50%',
  };

  const textSlideVariants = {
    hidden: {
      y: -100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <div className="relative flex flex-col h-[70%] hidden md:flex min-h-0">

      {/* Full-screen Section (hidden on mobile) */}
      <section
        ref={sectionRef}
        className="relative flex-1 items-center justify-center bg-ink snap-start hidden md:flex"
      >
        {/* Main Text */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={textSlideVariants}
        >
          <h1
            className="font-display italic font-normal text-5xl md:text-[6rem] lg:text-[10rem] xl:text-[13rem] text-center select-none w-full px-4"
            style={{
              ...textAnimation,
              color: '#f4efe6',
              WebkitTextFillColor: '#f4efe6',
              WebkitTextStroke: '1px #f4efe6',
              lineHeight: '1.05',
            }}
          >
            <div className="flex justify-center"><span className='mb-[-30] tracking-wide'>{brand.house}</span></div>
            <div className="flex justify-center"><span className='mt-[-30] tracking-wide'>{brand.mark}</span></div>
          </h1>
        </motion.div>

        {/* 3D Model */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          initial={{ x: '-50%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.8
          }}
        >
          <div className="w-60 h-60 md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] xl:w-[34rem] xl:h-[34rem]">
            <Canvas
              // dpr={window.devicePixelRatio}
              camera={{ position: [0, 0, 15], fov: 15 }}
              gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
              // offsetSize: measure the untransformed box so the CSS rotate/scale
              // below does not inflate the canvas and push the model off-centre
              resize={{ offsetSize: true }}
              style={{ width: "100%", height: "100%", transform: "rotate(-15deg) scale(1.15)" }}
            >
              <ambientLight intensity={0.3} />

              {/* Key directional light to highlight front label */}
              <directionalLight position={[5, 8, 10]} intensity={1.4} color="#fff6e8" />

              {/* Fill light to soften shadows */}
              <directionalLight position={[-5, 4, 8]} intensity={0.7} />

              {/* Rim light to make edges pop */}
              <directionalLight position={[0, 6, -10]} intensity={1.0} color="#cdb98e" />

              <group position={[0, 0, 0]}>
                <PerfumeBottle
                  variant="amber"
                  scale={0.95}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  quality="low"
                />
              </group>
            </Canvas>


          </div>
        </motion.div>


        {/* Outline Text */}
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center w-full pointer-events-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={textSlideVariants}
          transition={{ delay: 0.2 }} // Slight delay for the second text
        >
          <h1
            className="font-display italic font-normal text-5xl md:text-[6rem] lg:text-[10rem] xl:text-[13rem] text-center select-none w-full px-4"
            style={{
              ...textAnimation,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(244,239,230,0.75)',
              lineHeight: '1.05',
            }}
          >
            <div className="flex justify-center"><span className='mb-[-30] tracking-wide'>{brand.house}</span></div>
            <div className="flex justify-center"><span className='mt-[-30] tracking-wide'>{brand.mark}</span></div>
          </h1>
        </motion.div>
      </section>


    </div>
  );
}
