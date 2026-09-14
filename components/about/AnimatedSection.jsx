"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Flower2, Wind, Droplets, Gem } from "lucide-react"


export default function AnimatedSection({ section, index, swapLayout = false }) {
    const ref = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const isInView = useInView(ref, {
        once: true,
        margin: "-30% 0px -30% 0px",
        amount: 0.3
    })

    const accent = '#cdb98e'
    const icons = [Flower2, Wind, Droplets, Gem]
    const Icon = icons[index % icons.length]

    useEffect(() => {
        if (index === 0 && !hasAnimated) {
            setHasAnimated(true); // auto animate first section
        } else if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [index, isInView, hasAnimated]);

    const shouldAnimate = index === 0 || isInView || hasAnimated;


    return (
        <div
            ref={ref}
            className="relative w-full  flex items-center justify-center overflow-hidden bg-ink"
        >
            {/* Background grid effect */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(244,239,230,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,239,230,.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Vertical timeline divider */}            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ivory/10" />


            {/* Timeline dots */}
            <motion.div
                className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 0 6px rgba(205,185,142,0.12)`
                }}
            />

            <div className="relative w-full flex items-center">
                <div
                    className={`container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${swapLayout ? "md:[direction:rtl]" : ""}`}
                >
                    {/* Left side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: swapLayout ? 100 : -100 }}
                        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: swapLayout ? 100 : -100 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="order-2 md:order-1 text-ivory md:[direction:ltr] bg-ink-soft/60 backdrop-blur-sm border border-ivory/10 rounded-xl p-8 max-w-lg mx-auto"
                    >
                        <motion.div
                            className="relative w-14 h-14 mb-6 flex items-center justify-center rounded-full border border-champagne/40 text-champagne"
                            initial={{ scale: 0, rotate: -20 }}
                            animate={shouldAnimate ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Icon className="w-6 h-6" strokeWidth={1.25} />
                        </motion.div>

                        <motion.h2
                            className="font-display text-3xl md:text-4xl font-normal mb-5 text-ivory leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {section.title}
                        </motion.h2>

                        <motion.h3
                            className="eyebrow mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {section.subtitle}
                        </motion.h3>


                        <motion.p
                            className="text-taupe font-light text-sm md:text-base leading-relaxed max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {section.description}
                        </motion.p>

                        {/* Underline accent */}
                        <motion.div
                            className="mt-8 h-px w-16 bg-champagne"
                            initial={{ width: 0 }}
                            animate={shouldAnimate ? { width: 64 } : { width: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />
                    </motion.div>

                    {/* Right side - Large number */}
                    <motion.div
                        initial={{ opacity: 0, x: swapLayout ? -100 : 100 }}
                        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: swapLayout ? -100 : 100 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className={`order-1 md:order-2 flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} md:justify-center md:[direction:ltr]`}
                    >
                        <motion.div
                            className="relative"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        >
                            {/* Animated background circle */}
                            <motion.div
                                className="absolute inset-0 rounded-full blur-3xl"
                                animate={shouldAnimate ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                            />

                            {/* Number */}
                            <div className="font-display italic text-9xl md:text-[250px] font-normal text-transparent bg-clip-text
                                           bg-gradient-to-r from-ink-line via-ink-line to-taupe">
                                {section.number}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
