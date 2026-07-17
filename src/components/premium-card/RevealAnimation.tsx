'use client';

import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

/**
 * Scroll reveal: opacity 0→1, y 24→0, scale .96→1, spring, staggered by index,
 * once.
 *
 * All the logic lives in useReveal and cardVariants so nothing re-implements it.
 *
 * Read the note in useReveal before using this above the fold — it ships
 * `opacity:0` in the server HTML, and the noscript guard covers JS-off but not
 * slow-JS. Anything a visitor sees before scrolling belongs on the CSS `.rise`
 * animation instead.
 */
export function RevealAnimation({
  index = 0,
  className,
  children,
}: {
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const reveal = useReveal(index);
  return (
    <m.div {...reveal} className={className}>
      {children}
    </m.div>
  );
}
