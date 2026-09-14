// components/services/WhyProduct.jsx
'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import PerfumeBottle from '../../components/PerfumeBottle';
import { OrbitControls } from '@react-three/drei';
import { Leaf, Sparkles, Clock } from 'lucide-react';

const WhyProduct = ({ whyChooseUsSection }) => {
  const scrollDown = (e) => {
    e.preventDefault();
    // Get the next section element
    const currentSection = e.target.closest('section');
    const nextSection = currentSection.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If no next section, scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Destructure columns from the section data (✅ fallback when the CMS block is missing)
  const DEFAULT_FEATURES = [
    { title: 'Rare Naturals', description: 'Every edition is built around a single rare material, sourced directly from a small circle of growers and distillers.' },
    { title: 'Composed by Hand', description: 'Balanced, matured and refined in the atelier — then filled, sealed and numbered by hand, one flacon at a time.' },
    { title: 'Lasting Sillage', description: 'Concentrated compositions that stay close for the first hour, then leave a trail that lingers for the rest of the day.' },
  ];
  const cmsColumns = whyChooseUsSection?.columns || [];
  const columns = cmsColumns.length ? cmsColumns : DEFAULT_FEATURES;
  const icons = [Leaf, Sparkles, Clock];

  return (
    <section className="w-full py-15 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="eyebrow mb-5">The Difference</p>
          <h2 className="font-display text-4xl md:text-5xl font-normal text-ivory mb-4">Why the Atelier</h2>
          <p className="text-taupe font-light max-w-2xl mx-auto">Three things we will not compromise on, whatever the brief.</p>
        </div>

        {/* Right side - 3D Model */}
        <div className="w-full flex justify-center relative h-70 mb-6">
          <div className="relative w-full h-full center">
            <Canvas
              dpr={1}
              camera={{ position: [0, 0, 15], fov: 15 }}
              style={{ width: "100%", height: "100%" }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "low-power",
              }}
            >
              <ambientLight intensity={0.35} />

              <directionalLight position={[0, 6, 10]} intensity={1.4} color="#fff6e8" />
              <directionalLight position={[6, 4, 6]} intensity={0.8} />
              <directionalLight position={[-6, 4, 6]} intensity={0.8} />
              <directionalLight position={[0, 8, -10]} intensity={1.0} color="#cdb98e" />

              <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <PerfumeBottle
                  variant="clair"
                  scale={1.45}
                  rotation={[0.25, 0.6, -1.25]}
                  position={[0, 0.1, 0]}
                  spin={false}
                  quality="low"
                />
                <OrbitControls
                  enableZoom={false}
                  // enableDamping={false}
                  target={[0, 0, 0]}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={0}
                />
              </group>
            </Canvas>

            <button
              onClick={scrollDown}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-ivory animate-bounce p-3 rounded-full bg-ivory/10 hover:bg-ivory/20 transition-all z-50 cursor-pointer touch-manipulation focus:outline-none focus:ring-2 focus:ring-ivory/30 md:hidden"
              aria-label="Scroll Down"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Features */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 w-full max-w-6xl mx-auto">
            {columns.map((column, index) => {
              const title = column.richText?.root?.children?.find(child => child.tag === 'h3')?.children[0]?.text || column.title || 'Title Not Available';
              const description = column.richText?.root?.children?.find(child => child.type === 'paragraph')?.children[0]?.text || column.description || 'Description Not Available';
              const Icon = icons[index % icons.length];

              return (
                <div key={index} className="gap-6 flex-1 border-t border-ivory/10 pt-10">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full border border-champagne/40 text-champagne flex items-center justify-center">
                      <Icon className="w-5 h-5" strokeWidth={1.25} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm uppercase tracking-[0.18em] text-center text-ivory my-6">{title}</h3>
                    <p className="text-taupe font-light max-w-md mx-auto text-center">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};



export default WhyProduct;
