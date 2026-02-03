import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-merit-navy text-merit-sand py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="font-serif text-3xl mb-6">MERIT HOMES<span className="text-merit-gold">.</span></h2>
                    <p className="max-w-md text-merit-sand/60 text-sm leading-relaxed">
                        Acceessible Excellence. We believe that high-quality, custom-feel homes should be available to everyone, not just the ultra-wealthy. Transparent pricing, superior materials, and a process built on trust.
                    </p>
                </div>

                <div>
                    <h4 className="font-sans font-bold text-sm tracking-widest mb-6 text-merit-gold">EXPLORE</h4>
                    <ul className="space-y-4 text-sm text-merit-sand/80">
                        <li><Link href="/models" className="hover:text-merit-white transition-colors">Our Models</Link></li>
                        <li><Link href="/process" className="hover:text-merit-white transition-colors">The Merit Standard</Link></li>
                        <li><Link href="/locations" className="hover:text-merit-white transition-colors">Where We Build</Link></li>
                        <li><Link href="/transparency" className="hover:text-merit-white transition-colors">Pricing Guide</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-sans font-bold text-sm tracking-widest mb-6 text-merit-gold">CONTACT</h4>
                    <ul className="space-y-4 text-sm text-merit-sand/80">
                        <li><a href="tel:555-555-5555" className="hover:text-merit-white transition-colors">(555) 123-4567</a></li>
                        <li><a href="mailto:hello@merithomes.com" className="hover:text-merit-white transition-colors">hello@merithomes.com</a></li>
                        <li className="pt-4">
                            <button className="px-6 py-2 border border-merit-gold text-merit-gold hover:bg-merit-gold hover:text-merit-navy transition-colors text-xs tracking-widest">
                                BOOK CONSULTATION
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-merit-white/10 flex flex-col md:flex-row justify-between text-xs text-merit-sand/40">
                <p>&copy; {new Date().getFullYear()} Merit Homes. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
