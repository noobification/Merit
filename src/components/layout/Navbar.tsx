'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function Navbar() {
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        // Dynamic threshold: 400vh for home (matching hero pin), 50px for others
        const scrollThreshold = isHome ? (typeof window !== 'undefined' ? window.innerHeight * 4 : 4000) : 50;

        // Hide logic: Only hide if we've passed the threshold AND are scrolling down
        if (latest > previous && latest > scrollThreshold) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        // Background logic: meaningful scroll past the hero or header
        setScrolled(latest > scrollThreshold);
    });

    // Color Logic
    // Scrolled/Mobile: Always Dark Text on Light BG
    // Top (Home): White Text on Black BG
    // Top (Others): Dark Text on Light BG (assuming Sand/White pages)
    const textColorClass = scrolled || mobileOpen
        ? 'text-merit-navy'
        : isHome
            ? 'text-merit-white'
            : 'text-merit-navy'; // Default to dark for standard pages

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled || mobileOpen
                    ? "bg-merit-white/90 backdrop-blur-md border-b border-merit-navy/5 shadow-sm"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className={`font-serif text-2xl tracking-tighter font-bold z-50 ${textColorClass}`}>
                        MERIT<span className="text-merit-gold">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className={`hidden md:flex gap-8 items-center text-sm font-medium tracking-wide ${textColorClass}`}>
                        <Link href="/models" className="hover:text-merit-gold transition-colors">MODELS</Link>
                        <Link href="/process" className="hover:text-merit-gold transition-colors">THE PROCESS</Link>
                        <Link href="/story" className="hover:text-merit-gold transition-colors">OUR STORY</Link>
                        <Link href="/contact" className="px-6 py-2 bg-merit-gold text-merit-white hover:bg-merit-navy transition-colors">
                            START BUILDING
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X className={textColorClass} /> : <Menu className={textColorClass} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-merit-white z-40 flex flex-col items-center justify-center gap-8 text-xl font-serif text-merit-navy"
                    >
                        <Link href="/models" onClick={() => setMobileOpen(false)}>Models</Link>
                        <Link href="/process" onClick={() => setMobileOpen(false)}>The Process</Link>
                        <Link href="/story" onClick={() => setMobileOpen(false)}>Our Story</Link>
                        <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-merit-gold">Start Building</Link>
                    </motion.div>
                )}
            </motion.nav>
        </>
    );
}
