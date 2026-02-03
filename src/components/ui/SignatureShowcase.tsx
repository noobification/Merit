'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Project, getProjects } from '@/lib/sanity';
import { urlForImage } from '@/sanity/lib/image';

gsap.registerPlugin(ScrollTrigger);

// Fallback data with local assets
const MOCK_PROJECTS: (Partial<Project> & { localImage?: string })[] = [
    {
        _id: '1',
        title: 'Rosa Lane',
        priceRange: '$980k - $1M+',
        status: 'sold',
        sqft: 3780,
        bedrooms: 4,
        bathrooms: 3.5,
        description: 'Statement luxury in Lemont. A 3,800 sqft brick and stone masterpiece featuring a dramatic modern-farmhouse aesthetic and manicured grounds.',
        slug: { current: 'rosa-lane-lemont' },
        localImage: '/portfolio/rosa-lane.png'
    },
    {
        _id: '2',
        title: '78th Avenue',
        priceRange: '$600k+',
        status: 'sold',
        sqft: 2155,
        bedrooms: 4,
        bathrooms: 2.5,
        description: 'Striking modern architecture in Bridgeview. Clean lines, mixed material facade, and oversized windows define this 2023 contemporary build.',
        slug: { current: '78th-ave-bridgeview' },
        localImage: '/portfolio/78th-ave.png'
    },
    {
        _id: '3',
        title: '114th Street',
        priceRange: '$395k+',
        status: 'sold',
        sqft: 2600,
        bedrooms: 4,
        bathrooms: 3,
        description: 'Timeless transitional design in Worth. Features a welcoming enclosed porch and robust brick construction, blending classic charm with modern durability.',
        slug: { current: '114th-st-worth' },
        localImage: '/portfolio/114th-st.png'
    },
    {
        _id: '4',
        title: '83rd Avenue',
        priceRange: '$630k+',
        status: 'sold',
        sqft: 1801,
        bedrooms: 5,
        bathrooms: 3,
        description: 'Estate-style presence in Hickory Hills. A grand 5-bedroom residence showcasing elegant stone detailing, sweeping rooflines, and a private paver driveway.',
        slug: { current: '83rd-ave-hickory-hills' },
        localImage: '/portfolio/hickory-hills.png'
    },
    {
        _id: '5',
        title: 'Garden Lane',
        priceRange: '$600k+',
        status: 'sold',
        sqft: 2775,
        bedrooms: 5,
        bathrooms: 3,
        description: 'Architectural split-level in Justice. A bold contemporary form with expansive glass, wood cladding, and a sleek integrated garage design.',
        slug: { current: 'garden-ln-justice' },
        localImage: '/portfolio/garden-ln.png'
    },
    {
        _id: '6',
        title: 'Spring Street',
        priceRange: '$400k - $500k',
        status: 'sold',
        sqft: 2000,
        bedrooms: 3,
        bathrooms: 2.5,
        description: 'Boutique cottage living in Willow Springs. Crafted with natural materials and warm wood tones to sit in perfect harmony with its wooded surroundings.',
        slug: { current: 'spring-st-willow-springs' },
        localImage: '/portfolio/spring-st.png'
    }
];

export function SignatureShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const [projects, setProjects] = useState<(Partial<Project> & { localImage?: string })[]>(MOCK_PROJECTS);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        const fetchp = async () => {
            try {
                const data = await getProjects();
                if (data && data.length > 0) {
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects, using mock", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchp();
    }, []);

    // GSAP Horizontal Scroll
    useEffect(() => {
        if (!sectionRef.current || !railRef.current || !triggerRef.current) return;

        const section = sectionRef.current;
        const rail = railRef.current;
        const trigger = triggerRef.current;

        // Calculate total scroll width
        // We want to scroll effectively the width of the rail minus the viewport width
        // A simple way is to pin the section and translate the rail

        const getScrollAmount = () => -(rail.scrollWidth - window.innerWidth + 100); // +100 for padding

        const ctx = gsap.context(() => {
            const scrollTween = gsap.to(rail, {
                x: getScrollAmount,
                ease: 'none',
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top top',
                    end: () => `+=${rail.scrollWidth - window.innerWidth}`,
                    pin: true,
                    scrub: 1, // Smooth interaction
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });
        }, section);

        return () => ctx.revert();
    }, [projects, isLoading]);

    return (
        <section ref={sectionRef} className="relative bg-merit-sand overflow-hidden">
            {/* 
              This trigger wrapper serves as the pinning target.
              It must be 100vh to fill the screen while pinned.
            */}
            <div ref={triggerRef} className="h-screen flex flex-col justify-center relative">

                {/* Header Section (Static within the pinned view) */}
                <div className="absolute top-12 left-6 md:left-12 z-20">
                    <span className="block text-merit-gold text-xs font-bold tracking-[0.3em] uppercase mb-2">
                        Portfolio
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl text-merit-navy">
                        Signature <br className="hidden md:block" /> Collection.
                    </h2>
                </div>

                {/* Horizontal Rail */}
                {/* Padding left pushes the first card to start after the text or nicely spaced */}
                <div
                    ref={railRef}
                    className="flex gap-8 md:gap-16 px-6 md:px-12 items-center w-max h-[60vh] md:h-[70vh] translate-y-12"
                    style={{ marginLeft: '25vw' }} // Offset start
                >
                    {projects.map((project, index) => (
                        <div
                            key={project._id || index}
                            className="relative group w-[80vw] md:w-[45vw] h-full flex-shrink-0 bg-white/50 backdrop-blur-sm border border-merit-navy/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white"
                        >
                            {/* Image Area */}
                            <div className="h-[60%] w-full overflow-hidden relative">
                                {project.localImage ? (
                                    <img
                                        src={project.localImage}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : project.mainImage ? (
                                    <img
                                        src={urlForImage(project.mainImage).width(800).height(600).url()}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-merit-navy/10 flex items-center justify-center text-merit-navy/20 font-serif">
                                        No Image
                                    </div>
                                )}

                                {/* Status Badge */}
                                {project.status && (
                                    <div className="absolute top-4 right-4 bg-merit-navy text-white text-[10px] tracking-widest uppercase px-3 py-1 font-bold">
                                        {project.status === 'sold' ? 'Sold' : project.status}
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-6 md:p-8 flex flex-col justify-between h-[40%]">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif text-2xl md:text-3xl text-merit-navy">
                                            {project.title}
                                        </h3>
                                        <ArrowRight className="text-merit-gold w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                    </div>
                                    <p className="text-merit-charcoal/60 text-sm md:text-base line-clamp-2 mb-4">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex items-end justify-between border-t border-merit-navy/10 pt-6">
                                    <div className="flex gap-6 text-xs font-bold tracking-wider uppercase text-merit-navy/80">
                                        {project.sqft && <span>{project.sqft.toLocaleString()} SqFt</span>}
                                        {project.bedrooms && <span>{project.bedrooms} Bed</span>}
                                        {project.bathrooms && <span>{project.bathrooms} Bath</span>}
                                    </div>
                                    <div className="text-merit-gold font-serif text-xl">
                                        {project.priceRange || 'Inquire'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* "View All" Card at the end */}
                    <Link href="/models" className="w-[80vw] md:w-[20vw] h-full flex-shrink-0 flex items-center justify-center group border-l border-merit-navy/10">
                        <div className="text-center">
                            <span className="block font-serif text-2xl md:text-4xl m-4 text-merit-navy group-hover:text-merit-gold transition-colors">
                                View Full <br /> Collection
                            </span>
                            <div className="w-16 h-1 bg-merit-navy group-hover:bg-merit-gold transition-colors mx-auto mt-4" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Instructions / Progress Bar (Optional) */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center z-10 pointer-events-none opacity-50">
                <span className="text-xs uppercase tracking-[0.2em] text-merit-navy">Scroll to Explore</span>
            </div>
        </section>
    );
}
