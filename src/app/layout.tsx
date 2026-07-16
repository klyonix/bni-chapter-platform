import type { Metadata } from 'next';
import '@/styles/globals.css';

const siteUrl = 'https://azpire.klyonix.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BNI Azpire — Power Teams',
    template: '%s | BNI Azpire',
  },
  description:
    'Power team portfolio for BNI Azpire, Greater Coimbatore — power teams and their members. Hosted by KlyONIX.',
  applicationName: 'BNI Azpire Power Teams',
  authors: [{ name: 'KlyONIX Tech Consulting Pvt Ltd' }],
  keywords: [
    'BNI',
    'BNI Azpire',
    'Greater Coimbatore',
    'Power Team',
    'Networking',
    'Referrals',
    'KlyONIX',
  ],
  icons: {
    // Favicon placeholder — replace public/favicon.ico with the real asset.
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'BNI Azpire Power Teams',
    title: 'BNI Azpire — Power Teams',
    description:
      'Power team portfolio for BNI Azpire, Greater Coimbatore — power teams and their members. Hosted by KlyONIX.',
    // OpenGraph image placeholder — add public/images/og-default.png later.
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'BNI Azpire Power Teams',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNI Azpire — Power Teams',
    description:
      'Power team portfolio for BNI Azpire, Greater Coimbatore — power teams and their members. Hosted by KlyONIX.',
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
