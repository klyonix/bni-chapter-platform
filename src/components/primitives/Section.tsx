import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Vertical rhythm (plan §7: section padding 32/48/64).
 *
 * Spacing is a token, not a per-call-site guess. Whitespace is doing the work
 * that decoration would otherwise do, so it has to be consistent to read as
 * intentional rather than accidental.
 */
type Space = 'sm' | 'md' | 'lg';

const SPACES: Record<Space, string> = {
  sm: 'py-8', // 32px
  md: 'py-12', // 48px
  lg: 'py-16', // 64px
};

export function Section({
  space = 'md',
  as: Tag = 'section',
  className,
  children,
}: {
  space?: Space;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(SPACES[space], className)}>{children}</Tag>;
}

/** A 1px rule. Not a box, not a divider with margins baked in. */
export function Hairline({ className }: { className?: string }) {
  return <hr aria-hidden="true" className={cn('h-px border-0 bg-hairline', className)} />;
}
