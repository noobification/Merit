import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DeconstructionHero } from "@/components/ui/DeconstructionHero";
import { SupplierCarousel } from "@/components/ui/SupplierCarousel";
import { SignatureShowcase } from "@/components/ui/SignatureShowcase";

export default function Home() {
  return (
    <main id="homepage-main" className="min-h-screen bg-black block">
      <Navbar />

      <DeconstructionHero />

      <SupplierCarousel />

      <SignatureShowcase />

      <Footer />
    </main>
  );
}
