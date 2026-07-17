'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useScrollFade } from '@/hooks/useScrollFade';

/**
 * Lottie is loaded client-only (ssr:false): it touches the DOM, and keeping it
 * out of the server render also splits the lottie-web runtime out of the initial
 * bundle so it never blocks first paint. The animation JSON itself is fetched at
 * runtime from /public rather than imported, so its ~270 kB stays out of the JS.
 */
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Stat = { value: number; label: string };

type Circle = {
  size: number;
  color: string; // "r g b"
  alpha: number;
  dur: number;
  delay: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

/**
 * There are deliberately no reveal variants here.
 *
 * This content is above the fold on /civil — the page a QR visitor opens. Framer
 * renders `initial` into the server HTML, so `initial="hidden"` shipped the
 * eyebrow, the h1, the description and the CTA as style="opacity:0". With JS
 * blocked or merely slow on 4G, the hero was blank: no heading, no description,
 * no button. That was live.
 *
 * The arrival animation is now the CSS `.rise` classes from globals.css. They
 * need no JS, cost no bytes, look the same, and are already covered by the
 * prefers-reduced-motion block. Framer stays for what only it can do: the
 * scroll-linked fade, which only ever acts on already-visible content.
 */

export function TeamHero({
  eyebrow,
  heading,
  description,
  stats,
  ctaLabel,
  ctaHref,
  lottieSrc = '/construction-site.json',
}: {
  eyebrow: string;
  heading: string;
  description: string;
  stats: Stat[];
  ctaLabel: string;
  ctaHref: string;
  lottieSrc?: string;
}) {
  const reduce = useReducedMotion();
  const [anim, setAnim] = useState<object | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { opacity, y } = useScrollFade(heroRef);

  useEffect(() => {
    let alive = true;
    fetch(lottieSrc)
      .then((r) => r.json())
      .then((d) => {
        if (alive) setAnim(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [lottieSrc]);

  return (
    <section ref={heroRef} className="relative isolate overflow-hidden pb-6 pt-14 sm:pt-20">
      <FloatingCircles reduce={!!reduce} />

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
        {/* Left column: heading, description, counters, CTA. */}
        <motion.div style={{ opacity, y }} className="order-2 lg:order-1">
          <p className="rise text-micro uppercase tracking-wide text-ink-400">{eyebrow}</p>
          <h1 className="rise rise-1 mt-3 text-balance font-display text-display-l text-ink">
            {heading}
          </h1>
          <p className="rise rise-2 mt-4 max-w-[34rem] text-body-l text-ink-700">{description}</p>

          {stats.length > 0 && (
            <dl className="rise rise-3 mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} reduce={!!reduce} />
              ))}
            </dl>
          )}

          <div className="rise rise-3 mt-9">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-label font-semibold text-paper shadow-sm transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {ctaLabel}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Right column: the Lottie, fading in once its JSON has loaded. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: anim ? 1 : 0, scale: anim ? 1 : 0.98 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 mx-auto w-full max-w-[560px] lg:order-2"
          aria-hidden="true"
        >
          {anim && (
            <Lottie animationData={anim} loop autoplay={!reduce} className="h-auto w-full" />
          )}
        </motion.div>
      </div>
    </section>
  );
}

/** A single count-up stat. Animates 0 → value once, when scrolled into view. */
function StatCounter({ value, label, reduce }: { value: number; label: string; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <div ref={ref}>
      <dd className="font-display text-display-m tabular-nums text-ink">
        {/*
          The counter starts at 0 and counts up, which means the server HTML says
          "0". Without JS that is not a missing number, it is a WRONG one — the
          page would claim the team has 0 members.

          So the animated span is hidden and the true value shown when JS is off,
          via the same noscript guard the reveals use (see app/layout.tsx).
        */}
        <span data-counter>{n}</span>
        <noscript>{value}</noscript>
      </dd>
      <dt className="mt-0.5 text-micro uppercase tracking-wide text-ink-400">{label}</dt>
    </div>
  );
}

/** Soft, slowly floating decorative blobs behind the hero. Purely decorative. */
function FloatingCircles({ reduce }: { reduce: boolean }) {
  const circles: Circle[] = [
    { size: 200, color: '207 32 48', alpha: 0.06, dur: 7, delay: 0, top: '-3rem', left: '2%' },
    { size: 130, color: '91 127 166', alpha: 0.1, dur: 9, delay: 1.2, top: '34%', right: '6%' },
    { size: 90, color: '207 32 48', alpha: 0.05, dur: 8, delay: 0.6, bottom: '-2rem', left: '40%' },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {circles.map((c, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            width: c.size,
            height: c.size,
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
            backgroundColor: `rgb(${c.color} / ${c.alpha})`,
          }}
          animate={reduce ? undefined : { y: [0, -18, 0] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
        />
      ))}
    </div>
  );
}
