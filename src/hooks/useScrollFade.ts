'use client';

import { useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

/**
 * Scroll-linked hero fade: content fades and drifts up as the hero leaves,
 * handing focus to the grid.
 *
 * `opacity` and `y` only — both compositor properties, so this runs off the main
 * thread and cannot jank the scroll. No scroll listener, no layout reads.
 *
 * The opacity curve is deliberately not linear. A straight 1→0 ramp starts
 * dimming the headline the instant you touch the page; this holds near-full
 * through the first quarter and then drops away, so the hero reads as handing
 * over rather than being wiped.
 *
 * Note this fades something already visible — it never sets a hidden initial
 * state, so there is nothing here a slow-JS visitor can get stuck behind. That
 * is the whole difference between this and a reveal.
 */
export function useScrollFade(ref: RefObject<HTMLElement | null>): {
  opacity: MotionValue<number> | number;
  y: MotionValue<number> | number;
} {
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Hero top meets viewport top → hero bottom meets viewport top: the fade
    // completes exactly as the hero leaves.
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 0.9, 0.7, 0.4, 0.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Hooks run unconditionally; the static choice happens at the end.
  return reduced ? { opacity: 1, y: 0 } : { opacity, y };
}
