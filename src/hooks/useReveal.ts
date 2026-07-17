'use client';

import { useReducedMotion } from 'framer-motion';
import { revealDelay, revealStatic, revealVariants } from '@/components/premium-card/cardVariants';

/**
 * Props for a scroll-revealing motion element.
 *
 * ── The no-JS problem, and what we actually do about it ──────────────────────
 *
 * Framer renders `initial` into the server HTML. So `initial="hidden"` ships
 * `style="opacity:0"` in the markup, and a visitor whose JS is blocked — or just
 * slow, on 4G, having scanned a QR code on a water bottle — sees nothing at all.
 * That is the exact failure this site cannot afford, and it is why docs/MOTION.md
 * exists.
 *
 * The guard is a `<noscript>` rule in the root layout that forces
 * `[data-reveal]` visible with `!important`, which beats an inline style. That
 * covers JS-off completely.
 *
 * It does NOT cover slow JS: between first paint and hydration the element is
 * genuinely invisible. That window is small, but it is real, so the rule is:
 * **never reveal above-the-fold content.** The hero and the page header stay on
 * the CSS `.rise` animation, which needs no JS at all. Reveal is for things the
 * visitor has to scroll to, by which time JS has long since arrived.
 */
export function useReveal(index = 0) {
  const reduced = useReducedMotion();

  return {
    'data-reveal': true,
    variants: reduced ? revealStatic : revealVariants,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    // once: the page is not a slideshow. amount 0.2 fires as the top edge
    // arrives rather than making people scroll past a blank card.
    viewport: { once: true, amount: 0.2, margin: '0px 0px -10% 0px' },
    transition: reduced ? { duration: 0 } : { delay: revealDelay(index) },
  };
}
