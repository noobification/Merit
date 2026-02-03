import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

// import { client } from "@/sanity/lib/client";
// import { urlForImage } from "@/sanity/lib/image";
// import { projectId } from "@/sanity/env";

export default async function ModelsPage() {
    // Mock data for build safety until SANITY_PROJECT_ID is set
    const projects: any[] = [];

    /* 
    // UNCOMMENT WHEN PROJECT ID IS SET
    if (projectId && projectId !== 'mock_id') {
      try {
         const query = `*[_type == "project"] { title, slug, mainImage, priceRange, description }`;
         projects = await client.fetch(query);
      } catch (e) { console.error(e); }
    }
    */

    return (
        <main className="flex min-h-screen flex-col bg-merit-sand">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
                <h1 className="font-serif text-5xl text-merit-navy mb-4">Our Models</h1>
                <p className="text-merit-charcoal/60 max-w-xl mb-16">
                    Explore our collection of thoughtfully designed homes. The Merit Standard comes standard in every single one.
                </p>

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project: any) => (
                            <Link href={`/models/${project.slug?.current}`} key={project._id} className="group block bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="relative aspect-[4/3] overflow-hidden bg-merit-navy/10">
                                    {/*
                  {project.mainImage && (
                    <Image 
                      src={urlForImage(project.mainImage).url()} 
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  */}
                                </div>
                                <div className="p-6">
                                    <span className="block text-merit-gold text-xs font-bold tracking-widest uppercase mb-2">
                                        {project.priceRange || "Inquire for Pricing"}
                                    </span>
                                    <h3 className="font-serif text-2xl text-merit-navy mb-2">{project.title}</h3>
                                    <p className="text-sm text-merit-charcoal/70 line-clamp-2">{project.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="min-h-[40vh] flex flex-col items-center justify-center border border-dashed border-merit-navy/20 bg-merit-white/50 p-12 text-center">
                        <h3 className="font-serif text-xl text-merit-navy mb-2">Sanity Integration Ready</h3>
                        <p className="text-merit-charcoal/60 mb-6 max-w-md">
                            The CMS connection is configured. To load your models, please add your <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to .env.local and uncomment the fetch logic in <code>src/app/models/page.tsx</code>.
                        </p>
                        <div className="text-xs bg-merit-navy text-merit-white p-4 rounded text-left font-mono">
                            # .env.local<br />
                            NEXT_PUBLIC_SANITY_PROJECT_ID=your_id_here
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
