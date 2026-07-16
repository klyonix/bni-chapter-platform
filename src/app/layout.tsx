import type { Metadata } from 'next';
import { Inter_Tight, Newsreader } from 'next/font/google';
import '@/styles/globals.css';

/**
 * Fonts are self-hosted by next/font at build time — no runtime request to
 * Google, no render-blocking stylesheet, no consent surface.
 *
 * Newsreader (serif) carries display type, member names and the referral
 * pull-quote. Inter Tight carries UI and body. The pairing is the deliberate
 * anti-template choice: a grotesque throughout is what every generated site does.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500'],
  style: ['normal', 'italic'], // italic is used by the Ideal Referral quote
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  );
}
