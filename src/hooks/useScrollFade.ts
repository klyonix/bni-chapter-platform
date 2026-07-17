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

/**
 * The hero artwork's scroll motion: sinks and fades, gone by the CTA.
 *
 * The mirror of useScrollFade — the text lifts away (y: 0 → -40) while the scene
 * sinks (y: 0 → +60). Opposite directions read as depth; both moving the same
 * way would just look like the page scrolling twice.
 *
 * It fades faster than the text, reaching zero at 70% of the hero's travel,
 * which is roughly where the CTA sits. The artwork should be gone before the
 * button becomes the thing you are looking at.
 *
 * transform and opacity only, and it fades content that is already visible, so
 * there is nothing here a slow-JS visitor can get stuck behind.
 */
export function useScrollDrift(ref: RefObject<HTMLElement | null>): {
  opacity: MotionValue<number> | number;
  y: MotionValue<number> | number;
} {
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // 140px of travel, not 60: at 60 the sink was too polite to read as movement
  // against a whole viewport of scroll. Gone by 0.7 — the CTA sits near the
  // hero's bottom edge, so that is roughly where "Meet the team" takes over.
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [1, 0.5, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return reduced ? { opacity: 1, y: 0 } : { opacity, y };
}
