'use client';

import { useEffect, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PerfumeBottle from './PerfumeBottle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';
import { useRouter } from 'next/navigation';

export function SectionThree({
  title = "A single",
  highlightedTitle = "signature",
  subtitle = "for every occasion",
  ctaLabel = "Book a Consultation",
  description = `From a first eau de parfum to a bespoke composition made for one person alone, the atelier accompanies you at every step.
We advise on notes, concentration and ritual — and finish each flacon by hand.
You will not find a more considered fragrance house than Maison Sillage.`
}) {
  const router = useRouter();

  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  useEffect(() => {
    if (!scrollerRef?.current || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: scrollerRef.current,
        start: 'top 65%',
        toggleActions: 'play none none none',
      },
    });

    // 3D model container comes from left
    tl.fromTo(
      leftContentRef.current,
      {
        opacity: 0,
        x: -250,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
      }
    )

      // Text content stagger
      .fromTo(
        rightContentRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          stagger: 0.2,
          ease: 'power3.out',
        },
        '-=0.6'
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [scrollerRef]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-12 md:px-16 snap-start overflow-hidden"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-ink/50" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full justify-between">
        {/* LEFT — 3D MODEL */}
        <div
          ref={leftContentRef}
          className="w-full flex items-center justify-center h-[450px] md:h-[600px] lg:h-[750px] order-2 lg:order-1"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at center,
                rgba(14,13,11,0.35) 0%,
                rgba(14,13,11,0.7) 70%,
                rgba(14,13,11,0.95) 100%
              ),
              url('/images/35.png')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            boxShadow: 'inset 0 0 40px 25px rgba(14,13,11,0.8)',
          }}
        >
          <Canvas
            camera={{ position: [0, 2, 8], fov: 25 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[6, 6, 12]} intensity={1.2} color="#fff6e8" />
            <directionalLight position={[-6, 2, 10]} intensity={0.6} />
            <directionalLight position={[0, -3, -10]} intensity={0.8} color="#cdb98e" />

            <PerfumeBottle
              variant="vert"
              scale={0.9}
              position={[0, 0, 0]}
              rotation={[0, 0.4, 0]}
              quality="low"
            />

            <OrbitControls
              enableZoom={false}
              target={[0, 0, 0]}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
            />
          </Canvas>
        </div>

        {/* RIGHT — TEXT */}
        <div
          ref={rightContentRef}
          className="space-y-6 md:px-4 order-1 lg:order-2"
        >
          <h2 className="font-display text-4xl md:text-5xl font-normal leading-tight text-ivory">
            {title}{' '}
            <span className="italic text-champagne">{highlightedTitle}</span>{' '}
            {subtitle}
          </h2>

          {description
            ?.split(/<br\s*\/?>|\n/gi)
            .map((line, index) => (
              <p key={index} className="text-taupe font-light leading-relaxed">
                {line}
              </p>
            ))}


          <button
            onClick={() => router.push('/contact')}
            className="btn-primary"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
