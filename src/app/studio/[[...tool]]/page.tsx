/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js's catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import type { Metadata, Viewport } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: 'Merit Homes Studio',
    robots: {
        index: false,
        follow: false,
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default function StudioPage() {
    return <NextStudio config={config} />
}
