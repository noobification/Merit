import { client } from "@/sanity/lib/client";

export interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: any;
    gallery?: any[];
    status?: 'available' | 'sold' | 'model' | 'in-progress';
    priceRange?: string;
    sqft?: number;
    bedrooms?: number;
    bathrooms?: number;
    features?: string[];
    description?: string;
}

export async function getProjects(): Promise<Project[]> {
    return client.fetch(`
        *[_type == "project"] | order(title asc) {
            _id,
            title,
            slug,
            mainImage,
            gallery,
            status,
            priceRange,
            sqft,
            bedrooms,
            bathrooms,
            features,
            description
        }
    `);
}
