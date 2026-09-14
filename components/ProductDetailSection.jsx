'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

function ScrollDownButton() {
    return (
        <button
            onClick={scrollDown}
            className="absolute bottom-4 left-1/2 -translate-x-1/2
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
    );
}

function TextContent({ content, eyebrow }) {
    return (
        <div className="w-full lg:w-1/2 space-y-8">
            <div>
                {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
                <h1 className="font-display text-3xl md:text-4xl font-normal mb-4 text-ivory">{content?.title}</h1>
                <p className="text-taupe font-light text-[15px] leading-relaxed mb-8">
                    {content?.description}
                </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                {content?.tags.map((item, index) => (
                    <span
                        key={index}
                        className="text-sm text-ivory/80 font-light transition-all duration-300 relative overflow-hidden group inline-block"
                    >
                        <span className="mr-2 text-champagne text-base leading-none">·</span>
                        <span className="relative">
                            {item}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </span>
                ))}
            </div>
            <p className="font-display italic text-ivory/85 text-lg leading-relaxed mb-8">
                {content?.statement}
            </p>
        </div>
    );
}

export function ProductDetailSection({ side, model, content }) {
    return (
        <section className="w-full min-h-[70vh] bg-ink text-ivory py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div
                    className={`
    flex flex-col-reverse lg:flex-row
    gap-12 items-center
    ${side === "left" ? "lg:flex-row-reverse" : ""}
  `}
                >
                    {/* Left Column - Text Content */}
                    <TextContent content={content} eyebrow="The Collection" />

                    {/* Right Column - Product */}
                    <motion.div
                        className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative"
                        initial={{ x: side === 'right' ? 200 : -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 15,
                            duration: 0.5
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <Image
                                src="/images/bottle-amber-dark.png"
                                alt="Maison Sillage Nº 01 Bois d'Ambre"
                                width={400}
                                height={500}
                                className="w-auto h-full object-contain"
                                priority
                            />
                        </div>

                        <ScrollDownButton />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function ProductDetailSectiontwo({ side, model, content }) {
    return (
        <section className="w-full min-h-[70vh] bg-ink text-ivory py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col lg:flex-row gap-12 items-center
                               ${side === "left" ? "flex-col-reverse lg:flex-row-reverse" : ""}`}
                >
                    {/* Left Column - Text Content */}
                    <TextContent content={content} eyebrow="Bespoke Services" />

                    {/* Right Column - Product */}
<motion.div
    className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative"
    initial={{ x: side === 'right' ? 200 : -200, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{
        type: 'spring',
        stiffness: 60,
        damping: 15,
        duration: 0.5
    }}
>
    <div className="w-full h-full flex items-center justify-center">
        <Image
            src="/images/bottle-clair-dark.png"
            alt="Maison Sillage Nº 03 Sel Blanc"
            width={400}
            height={500}
            className="w-auto h-full object-contain"
            priority
        />
    </div>

    <ScrollDownButton />
</motion.div>
                </div>
            </div>
        </section>
    );
}
