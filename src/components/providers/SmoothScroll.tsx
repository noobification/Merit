'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        // Bind Lenis scroll event to ScrollTrigger update
        // This is critical for pinning to work correctly
        const lenisInstance = lenisRef.current?.lenis;
        if (lenisInstance) {
            lenisInstance.on('scroll', ScrollTrigger.update);
        }

        gsap.ticker.add(update);

        // Disable lag smoothing to prevent stutter on heavy load
        gsap.ticker.lagSmoothing(0);

        // Normalize scroll on mobile to prevent address bar jitter with ScrollTrigger pinning
        ScrollTrigger.normalizeScroll(true);

        return () => {
            gsap.ticker.remove(update);
            if (lenisInstance) {
                lenisInstance.off('scroll', ScrollTrigger.update);
            }
        };
    }, []);

    // Lenis options for "Heavy/Luxury" feel
    // lerp: 0.1 (default) - lower is smoother/heavier. 0.08 is a good sweet spot for "Yucca" feel.
    const lenisOptions = {
        lerp: 0.08,
        duration: 1.5,
        smoothTouch: true, // Enable for consistent momentum on mobile
        smoothWheel: true,
    };

    return (
        <ReactLenis root ref={lenisRef} autoRaf={false} options={lenisOptions}>
            {/* @ts-expect-error React 19 type mismatch for children */}
            {children}
        </ReactLenis>
    );
}
