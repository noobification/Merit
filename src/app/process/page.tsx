import { DeconstructionHero } from "@/components/ui/DeconstructionHero";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ProcessPage() {
    return (
        <main className="min-h-screen bg-merit-sand block">
            <Navbar />

            {/* 
        Deconstruction Hero Section 
        - Canvas-based image sequence scrubbing
        - Preloads and renders 238 frames
      */}
            <DeconstructionHero />

            <section className="py-32 px-6 max-w-4xl mx-auto text-center relative z-10 bg-merit-sand">
                <span className="block text-merit-gold text-sm font-bold tracking-[0.3em] uppercase mb-6">
                    The Transparency Promise
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-merit-navy mb-8">
                    Quality You Can See Through.
                </h2>
                <p className="text-merit-charcoal/70 text-lg leading-relaxed mb-12">
                    Most builders hide their shortcuts behind drywall. We prefer to show you exactly what goes into your home.
                    From the reinforced foundation to the triple-pane glazing, every layer is a testament to the Merit Standard.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-20">
                    <div>
                        <h3 className="font-serif text-2xl text-merit-navy mb-4">Foundation</h3>
                        <p className="text-sm text-merit-charcoal/60">Reinforced steel rebar grid exceeding code requirements by 30%.</p>
                    </div>
                    <div>
                        <h3 className="font-serif text-2xl text-merit-navy mb-4">Framing</h3>
                        <p className="text-sm text-merit-charcoal/60">Premium kiln-dried lumber to prevent warping and ensure perfectly straight walls.</p>
                    </div>
                    <div>
                        <h3 className="font-serif text-2xl text-merit-navy mb-4">Efficiency</h3>
                        <p className="text-sm text-merit-charcoal/60">Spray-foam insulation sealing every gap for maximum thermal retention.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
