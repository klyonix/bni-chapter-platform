'use client';

import { m, useReducedMotion } from 'framer-motion';
import { iconIdle } from '@/components/premium-card/cardVariants';
import type { IconMotion } from '@/components/premium-card/categoryThemes';
import { CategoryIcon } from '@/components/team/CategoryIcon';
import type { CategoryIconName } from '@/data/professions';

/**
 * The trade's glyph, idling.
 *
 * The motion is per family (float / pulse / rotate) and is deliberately almost
 * imperceptible — 6–8s, a few pixels or a few percent. It should read as the
 * card being alive, not as something demanding attention. Twelve cards each
 * waving would be a fairground.
 *
 * Only `y`, `scale` and `rotate` move: compositor properties. Reduced motion
 * gets the glyph, static — the mark is information, the movement is not.
 *
 * Note this animates `animate`, not `initial`, so nothing here is ever hidden in
 * the server HTML. Safe above the fold, unlike a reveal.
 */
export function AnimatedIcon({
  name,
  motion: kind,
  className = 'h-5 w-5',
}: {
  name: CategoryIconName;
  motion: IconMotion;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <CategoryIcon name={name} className={className} />;

  return (
    <m.span className="inline-flex" animate={iconIdle[kind]}>
      <CategoryIcon name={name} className={className} />
    </m.span>
  );
}
