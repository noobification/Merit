'use client';

import { motion } from "framer-motion";
import { Button } from "./Button";

interface HeroProps {
    headline: string;
    subheadline: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string; // URL for background
}

export function Hero({ headline, subheadline, ctaText = "Discover More", ctaLink = "/models", backgroundImage }: HeroProps) {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-merit-navy text-merit-white">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
                {backgroundImage ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-merit-navy via-[#0f2040] to-merit-charcoal opacity-90" />
                )}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <span className="block text-merit-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">
                        Democratizing Luxury
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight font-medium tracking-tight">
                        {headline}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="max-w-2xl text-lg md:text-xl text-merit-white/80 font-light leading-relaxed"
                >
                    {subheadline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                >
                    <Button href={ctaLink} variant="primary">
                        {ctaText}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
