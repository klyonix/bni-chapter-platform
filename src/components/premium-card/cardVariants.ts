import type { Variants } from 'framer-motion';

/**
 * Shared motion variants. Nothing re-declares these locally.
 *
 * Only `opacity`, `y` and `scale` appear anywhere here — all compositor
 * properties. No width/height/top/left, no filter, no box-shadow: those are the
 * ones that repaint every frame and cost you 60fps on a mid-range Android.
 */

/** Distance a revealing element travels. Short: this is a hint, not a journey. */
const RISE = 24;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: RISE, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 },
  },
};

/** Static twin, used verbatim when the visitor asks for reduced motion. */
export const revealStatic: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
};

/**
 * Stagger step. 0.08s as the brief specifies, but capped by index in the grid
 * (see PremiumCard) — twelve cards at a compounding 80ms would leave the last
 * one arriving nearly a second late, and a QR visitor should never wait on
 * choreography.
 */
export const STAGGER_STEP = 0.08;
export const STAGGER_CAP = 7;

export function revealDelay(index: number): number {
  return Math.min(index, STAGGER_CAP) * STAGGER_STEP;
}

/**
 * Idle motion for the trade glyph. Slow and tiny — you should feel it only if
 * you look. Transform-only.
 */
export const iconIdle = {
  float: {
    y: [0, -4, 0],
    transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
  },
  pulse: {
    scale: [1, 1.06, 1],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
  rotate: {
    rotate: [0, 4, 0, -4, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
} as const;
