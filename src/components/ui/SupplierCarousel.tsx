'use client';

import { useEffect, useRef } from 'react';

const SUPPLIERS = [
    "Andersen Windows",
    "Trex Decking",
    "GrK Fasteners",
    "James Hardie",
    "Kohler",
    "Sherwin Williams",
    "Cambria",
    "Delta Faucets"
];

export function SupplierCarousel() {
    return (
        <section className="w-full bg-merit-sand py-12 md:py-20 border-b border-merit-navy/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-merit-navy/40">
                    Trusted Partners
                </p>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks for Fade Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-merit-sand to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-merit-sand to-transparent z-10 pointer-events-none" />

                {/* Scrolling Track */}
                <div className="flex w-max animate-infinite-scroll hover:pause">
                    {/* First Copy */}
                    <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {SUPPLIERS.map((supplier, i) => (
                            <span key={`s1-${i}`} className="font-serif text-2xl md:text-3xl text-merit-navy whitespace-nowrap">
                                {supplier}
                            </span>
                        ))}
                    </div>
                    {/* Second Copy for Loop */}
                    <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {SUPPLIERS.map((supplier, i) => (
                            <span key={`s2-${i}`} className="font-serif text-2xl md:text-3xl text-merit-navy whitespace-nowrap">
                                {supplier}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
