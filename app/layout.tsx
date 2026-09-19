import { Analytics } from '@vercel/analytics/next'
import { Manrope } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { getSiteUrl, site } from '@/lib/site'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: 'kodcreate — Thoughtfully designed. Purposefully built.',
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Your business deserves an exceptional website. | kodcreate',
    description: site.description,
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    url: '/',
  },
  twitter: { card: 'summary_large_image', title: 'kodcreate — Website Development', description: site.description },
  icons: { icon: '/brand-icon.svg', apple: '/brand-icon.svg' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#edf4fe',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="light"><body className={`${manrope.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
