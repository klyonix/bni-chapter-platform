import type { Metadata } from 'next';
import '@/styles/globals.css';

const siteUrl = 'https://azpire.klyonix.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BNI Chapter Platform',
    template: '%s | BNI Chapter Platform',
  },
  description:
    'A modular platform for BNI chapters, power teams, and members. Hosted by KlyONIX.',
  applicationName: 'BNI Chapter Platform',
  authors: [{ name: 'KlyONIX Tech Consulting Pvt Ltd' }],
  keywords: ['BNI', 'Chapter', 'Power Team', 'Networking', 'Referrals', 'KlyONIX'],
  icons: {
    // Favicon placeholder — replace public/favicon.ico with the real asset.
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'BNI Chapter Platform',
    title: 'BNI Chapter Platform',
    description:
      'A modular platform for BNI chapters, power teams, and members. Hosted by KlyONIX.',
    // OpenGraph image placeholder — add public/images/og-default.png later.
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'BNI Chapter Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNI Chapter Platform',
    description:
      'A modular platform for BNI chapters, power teams, and members. Hosted by KlyONIX.',
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
