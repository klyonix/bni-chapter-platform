import type { Metadata } from 'next';
import '@/styles/globals.css';

// Site URL is provided at build time via NEXT_PUBLIC_SITE_URL so the production
// domain is not hardcoded in the repository. Falls back to a neutral value.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BNI Power Teams',
    template: '%s | BNI Power Teams',
  },
  description:
    'Power team portfolio for a BNI chapter — power teams and their members. Hosted by KlyONIX.',
  applicationName: 'BNI Power Teams',
  authors: [{ name: 'KlyONIX Tech Consulting Pvt Ltd' }],
  keywords: ['BNI', 'Power Team', 'Networking', 'Referrals', 'KlyONIX'],
  icons: {
    // Favicon placeholder — replace public/favicon.ico with the real asset.
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'BNI Power Teams',
    title: 'BNI Power Teams',
    description:
      'Power team portfolio for a BNI chapter — power teams and their members. Hosted by KlyONIX.',
    // OpenGraph image placeholder — add public/images/og-default.png later.
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'BNI Power Teams',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNI Power Teams',
    description:
      'Power team portfolio for a BNI chapter — power teams and their members. Hosted by KlyONIX.',
    images: ['/images/og-default.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
