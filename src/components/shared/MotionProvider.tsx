'use client';

import { domAnimation, LazyMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Framer's feature bundle, loaded once for the whole site.
 *
 * `domAnimation` (~15kb), not `domMax` (~25kb): nothing here uses `layout` or
 * drag. If a layout animation is ever added this must change, and the bundle
 * will grow — check before reaching for `layout`.
 *
 * `strict` throws if a full `motion` component renders anywhere inside. That is
 * the point: one `motion.div` silently pulls the entire bundle back in and undoes
 * the split. Use `m` from 'framer-motion' everywhere instead.
 *
 * ── On the history here ──────────────────────────────────────────────────────
 * docs/MOTION.md previously recorded that LazyMotion was broken in this stack.
 * That was wrong. The evidence was animations frozen mid-flight, which turned
 * out to be a backgrounded browser tab — browsers pause rAF when document.hidden
 * is true, so nothing driven by a MotionValue advances. The same false signal
 * later "broke" the expandable card, which was also fine. Verify animation by
 * screenshot, never by reading computed style from a headless tab.
 *
 * Features load synchronously. Async loading is what the docs suggest for
 * splitting further, but it was also tested under the frozen-tab conditions, so
 * that result is not trustworthy either — and sync is already the large win.
 * Revisit only with a visible tab and a real measurement.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
