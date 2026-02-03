'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Configuration
const FRAME_COUNT = 238; // 000 to 238
const IMAGES_DIR = '/HeroImages/';
const FILENAME_PREFIX = 'frame_';
const FILENAME_SUFFIX = '.jpg';

export function DeconstructionHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); // The aspect-ratio box
    const sectionRef = useRef<HTMLDivElement>(null);   // The full-screen pinned section
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const renderRef = useRef({ frame: 0 });
    const topTextRef = useRef<HTMLDivElement>(null);
    const bottomTextRef = useRef<HTMLDivElement>(null);

    // Preload Images
    useEffect(() => {
        const loadImages = async () => {
            const promises = [];
            const images: HTMLImageElement[] = [];

            for (let i = 0; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameIndex = i.toString().padStart(3, '0');
                    img.src = `${IMAGES_DIR}${FILENAME_PREFIX}${frameIndex}${FILENAME_SUFFIX}`;
                    img.onload = () => {
                        setImagesLoaded((prev) => prev + 1);
                        resolve();
                    };
                    img.onerror = () => {
                        resolve();
                    };
                    images[i] = img;
                });
                promises.push(promise);
            }

            imagesRef.current = images;
            await Promise.all(promises);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // Animation & Rendering Logic
    useLayoutEffect(() => {
        if (isLoading || !canvasRef.current || !containerRef.current || !sectionRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set Canvas Size based on the CONTAINER, not the Window
        const updateSize = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.clientWidth;
                canvas.height = containerRef.current.clientHeight;
                renderFrame();
            }
        };

        const renderFrame = () => {
            if (!ctx || !imagesRef.current.length) return;

            const frameIndex = Math.floor(renderRef.current.frame);
            const safeIndex = Math.min(Math.max(frameIndex, 0), FRAME_COUNT);
            const img = imagesRef.current[safeIndex];

            if (img) {
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;

                let drawWidth, drawHeight;

                if (canvasRatio > imgRatio) {
                    drawHeight = canvas.height;
                    drawWidth = img.width * (canvas.height / img.height);
                } else {
                    drawWidth = canvas.width;
                    drawHeight = img.height * (canvas.width / img.width);
                }

                const centerShift_x = (canvas.width - drawWidth) / 2;
                const centerShift_y = (canvas.height - drawHeight) / 2;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, drawWidth, drawHeight
                );
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        // GSAP ScrollTrigger
        // We pin the SECTION and create a master timeline for all animations
        const ctxCleanup = gsap.context(() => {

            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=400%', // 400% of viewport height = duration of scrub
                    pin: true,
                    pinSpacing: true,
                    scrub: 0, // Instant scrub for responsiveness
                    fastScrollEnd: true,
                    preventOverlaps: true,
                }
            });

            // 1. Frame Animation (Spans the entire scroll duration 0 -> 100%)
            mainTimeline.to(renderRef.current, {
                frame: FRAME_COUNT - 1,
                snap: 'frame',
                ease: 'none',
                duration: 1, // Normalized relative duration
                onUpdate: () => renderFrame(),
            }, 0);

            // 2. Background Color Transition (Spans entire duration 0 -> 100%)
            mainTimeline.to('#homepage-main', {
                backgroundColor: '#F4F0EB', // Merit Sand
                ease: 'none',
                duration: 1
            }, 0);

            // 3. Text Animations

            // Top Text: Slide IN (Left -> Center)
            if (topTextRef.current) {
                // Enter
                mainTimeline.fromTo(topTextRef.current,
                    { x: -100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        ease: 'power2.out',
                        duration: 0.2 // Ends at 20%
                    },
                    0
                );
                // Exit (Center -> Right Off-screen)
                mainTimeline.to(topTextRef.current,
                    {
                        x: '150vw', // Move fully across to right
                        opacity: 0,
                        ease: 'power1.in',
                        duration: 0.4
                    },
                    0.5 // Start exit halfway through scroll
                );
            }

            // Bottom Text: Slide IN (Right -> Center)
            if (bottomTextRef.current) {
                // Enter (Staggered start)
                mainTimeline.fromTo(bottomTextRef.current,
                    { x: 100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        ease: 'power2.out',
                        duration: 0.2
                    },
                    0.2
                );
                // Exit (Center -> Left Off-screen)
                mainTimeline.to(bottomTextRef.current,
                    {
                        x: '-150vw', // Move fully across to left
                        opacity: 0,
                        ease: 'power1.in',
                        duration: 0.4
                    },
                    0.5 // Start exit halfway through scroll (synced with top text exit?)
                );
            }

            // Force refresh to ensure pinning calculations are correct after images load
            ScrollTrigger.refresh();

        }, sectionRef);

        return () => {
            window.removeEventListener('resize', updateSize);
            ctxCleanup.revert();
        };
    }, [isLoading]);

    return (
        // FULL SCREEN SECTION (Pinned)
        <section
            ref={sectionRef}
            className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 
          CONSTRAINED CONTAINER
          - Max Width: 7xl (approx 1280px) or slightly larger
          - Aspect Ratio: Video (16:9) typical for standard photos
          - Shadow & Rounded for "Framed" look
      */}
            <div
                ref={containerRef}
                className="relative w-full max-w-[1400px] aspect-video bg-black/5 shadow-2xl md:rounded-lg overflow-hidden"
            >
                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-merit-sand text-merit-navy">
                        <div className="text-xl font-serif mb-2">Loading Sequence...</div>
                        <div className="w-48 h-[2px] bg-merit-navy/10 rounded-full overflow-hidden">
                            <div className="h-full bg-merit-navy transition-all duration-100" style={{ width: `${(imagesLoaded / FRAME_COUNT) * 100}%` }} />
                        </div>
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                />

                {/* Overlay Text */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10 mix-blend-difference text-white">
                    {!isLoading && (
                        <div className="text-center opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                            <h1 className="font-serif text-5xl md:text-8xl tracking-tight">DECONSTRUCT</h1>
                            <p className="tracking-[0.3em] text-[10px] md:text-xs font-bold uppercase mt-4 text-white/80">
                                Scroll to Analyze The Merit Standard
                            </p>
                        </div>
                    )}
                </div>

                {/* Scroll-Linked Text Animations */}
                {/* Top Left - Sliding IN from Left */}
                <div ref={topTextRef} className="absolute top-12 left-6 md:left-12 z-20 opacity-0 pointer-events-none mix-blend-difference text-white">
                    <span className="block font-bold tracking-[0.1em] text-lg md:text-2xl uppercase border-l-2 border-merit-gold pl-4">
                        Making Excellence attainable
                    </span>
                </div>

                {/* Bottom Right - Sliding IN from Right */}
                <div ref={bottomTextRef} className="absolute bottom-12 right-6 md:right-12 z-20 opacity-0 pointer-events-none mix-blend-difference text-white text-right">
                    <span className="block font-bold tracking-[0.1em] text-lg md:text-2xl uppercase border-r-2 border-merit-gold pr-4">
                        One Home at a time
                    </span>
                </div>
            </div>
        </section>
    );
}

