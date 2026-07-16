import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Horizontal measure. Mobile-first: this is a single 20px-gutter column on a
 * phone and simply stops growing on desktop, which is what "desktop adapts from
 * mobile" means in practice (plan §2).
 *
 * `prose` caps at 560px so the member list stays a readable single column
 * rather than stretching into a table on a laptop.
 */
type Width = 'prose' | 'wide';

const WIDTHS: Record<Width, string> = {
  prose: 'max-w-[35rem]', // 560px
  wide: 'max-w-[65rem]', // 1040px — home sections only
};

export function Container({
  width = 'prose',
  as: Tag = 'div',
  className,
  children,
}: {
  width?: Width;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn('mx-auto w-full px-5', WIDTHS[width], className)}>{children}</Tag>;
}
