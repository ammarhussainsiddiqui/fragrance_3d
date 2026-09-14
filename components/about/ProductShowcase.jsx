'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import PerfumeBottle from '../../components/PerfumeBottle';
import { OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';

export default function ProductShowcase({ imageSide = 'left', label, title, description, modal, modalScale, modalPosition = [0, 0, 0], rotation = [0, Math.PI / 8, 0] }) {
    const router = useRouter();
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

    return (
        <section className="relative w-full py-16 md:py-24 bg-ink overflow-hidden">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col lg:flex-row items-center ${imageSide === 'left' ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Left side - Product Image */}
                    <motion.div
                        className="w-full lg:w-1/2 relative z-10 mb-12 lg:mb-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full max-w-md mx-auto h-[400px] lg:h-[500px]">
                            <Canvas
                                shadows
                                camera={{ position: [0, 2, 12], fov: 35 }} // slightly up & back
                                style={{ width: '100%', height: '100%' }}  // remove CSS transform
                                gl={{ alpha: true, antialias: true }}
                            >
                                <ambientLight intensity={0.3} />
                                <directionalLight position={[6, 6, 12]} intensity={1.2} color="#fff6e8" />
                                <directionalLight position={[-6, 2, 10]} intensity={0.6} />
                                <directionalLight position={[0, -3, -10]} intensity={0.8} color="#cdb98e" />

                                {/* Model centered */}
                                <PerfumeBottle
                                    variant={modal}
                                    scale={modalScale}
                                    position={modalPosition}
                                    rotation={rotation}
                                    quality="low"
                                />

                                {/* OrbitControls */}
                                <OrbitControls
                                    enableZoom={false}
                                    target={[0, 0, 0]}
                                    maxPolarAngle={Math.PI / 2}
                                    minPolarAngle={0}
                                />
                            </Canvas>
                            {/* Arrow Button – Mobile only */}
                            <button
                                onClick={scrollDown}
                                className="absolute bottom-[-20px] left-1/2 -translate-x-1/2
                                           text-ivory animate-bounce p-3 rounded-full
                                           bg-ivory/10 hover:bg-ivory/20 transition-all
                                           z-50 cursor-pointer touch-manipulation
                                           focus:outline-none focus:ring-2 focus:ring-ivory/30
                                           md:hidden"
                                aria-label="Scroll Down"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                        </div>
                    </motion.div>

                    {/* Right side - Content */}
                    <div className="w-full lg:w-1/2 lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="eyebrow mb-5">
                                {label}
                            </h3>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-ivory mb-6">
                                {title}
                            </h2>
                            <p className="text-taupe font-light text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
                                {description}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn-primary"
                                onClick={() => router.push('/contact')}
                            >
                                Discover
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
