'use client';

import { useEffect, useRef, useContext } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollerContext } from '../lib/ScrollerContext';
import Image from 'next/image';

export function TwoColumnSection({
  leftColumnData = {
    title: "For Boutiques",
    description: "Stock the numbered collection in your boutique, with dedicated support from the atelier at every step.",
    points: [
      "Curated wholesale editions",
      "Bespoke in-store scenting",
      "Dedicated atelier support"
    ],
    cta: {
      url: "/ExploreDirectory",
      label: "Explore the Collection"
    }
  },
  rightColumnData = {
    title: "For Perfumers",
    description: "Collaborate with a house that values restraint, rare materials and the time it takes to get a composition right.",
    points: [
      "Collaborate on numbered editions",
      "Access rare natural materials",
      "Join a house that values restraint"
    ],
    cta: {
      url: "/JoinOurNetwork",
      label: "Join the Atelier"
    }
  }
}) {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  useEffect(() => {
    if (!scrollerRef?.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const animateColumn = (colRef) => {
      gsap.fromTo(
        colRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: colRef.current,
            scroller: scrollerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    };

    animateColumn(leftColRef);
    animateColumn(rightColRef);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf('*');
    };
  }, [scrollerRef]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-ink text-ivory overflow-hidden snap-start"
    >
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-transparent pointer-events-none" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full py-16">
        {/* Left Column */}
        <div ref={leftColRef} className="text-center space-y-6 mx-8 md:mx-1">
          <h2 className="font-display text-4xl md:text-5xl font-normal">{leftColumnData.title}</h2>
          <p className="text-taupe font-light max-w-md mx-auto leading-relaxed">
            {leftColumnData.description}
          </p>
          <div className="space-y-3 text-ivory/80 font-light">
            {leftColumnData.points.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
          <a href={'/coming-soon'}>
            <button className="btn-primary mx-auto">
              {leftColumnData.cta.label} <ArrowUpRight size={16} strokeWidth={1.5} />
            </button>
          </a>
        </div>
        <div ref={leftColRef} className="text-center space-y-6 flex justify-center align-center">
          <Image src='/images/bottle-clair-dark.png' alt='Maison Sillage flacon' width={400} height={500} className="w-2/3 md:w-4/5 h-auto object-contain"/>
        </div>
        {/* Right Column */}
        <div ref={rightColRef} className="text-center space-y-6 mx-8 md:mx-1">
          <h2 className="font-display text-4xl md:text-5xl font-normal">{rightColumnData.title}</h2>
          <p className="text-taupe font-light max-w-md mx-auto leading-relaxed">
            {rightColumnData.description}
          </p>
          <div className="space-y-3 text-ivory/80 font-light">
            {rightColumnData.points.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
          <a href={'/join'}>
            <button className="btn-primary mx-auto">
              {rightColumnData.cta.label} <ArrowUpRight size={16} strokeWidth={1.5} />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
