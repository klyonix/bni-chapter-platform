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
    default: 'BNI Azpire — Pollachi',
    template: '%s | BNI Azpire',
  },
  description:
    'The power teams of BNI Azpire, Pollachi. Find a trusted professional and contact them directly.',
  applicationName: 'BNI Azpire',
  authors: [{ name: 'KlyONIX Tech Consulting Pvt Ltd' }],
  keywords: [
    'BNI',
    'BNI Azpire',
    'Pollachi',
    'Coimbatore',
    'Power Team',
    'Networking',
    'Referrals',
  ],
  icons: {
    // Favicon placeholder — replace public/favicon.ico with the real asset.
    icon: '/favicon.ico',
  },
  // This is what renders when a member link is pasted into WhatsApp, which is
  // the main way profiles will travel. Worth getting right.
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'BNI Azpire',
    title: 'BNI Azpire — Pollachi',
    description:
      'The power teams of BNI Azpire, Pollachi. Find a trusted professional and contact them directly.',
    locale: 'en_IN',
    // TODO(content): og-default.png is still the scaffold placeholder.
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'BNI Azpire, Pollachi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNI Azpire — Pollachi',
    description:
      'The power teams of BNI Azpire, Pollachi. Find a trusted professional and contact them directly.',
    images: ['/images/og-default.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${interTight.variable}`}>
      <head>
        {/*
          The no-JS guard for scroll reveals.

          Framer renders `initial` into the server HTML, so a revealing element
          ships as style="opacity:0". With JS blocked it would stay invisible
          forever — the page would simply look empty. `!important` in a stylesheet
          beats an inline style, and <noscript> only applies when JS is off, so
          this costs nothing in the normal case.

          This covers JS-off. It does not cover slow-JS, which is why reveals are
          never used above the fold — see hooks/useReveal.ts.
        */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style
            dangerouslySetInnerHTML={{
              __html: '[data-reveal]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
