import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Profession filter chip (plan §6).
 *
 * A real <button> with aria-pressed, not a styled div, so it is keyboard
 * reachable and announces its state. Chips are the one component allowed to be
 * pill-shaped — that is their established convention, not decoration.
 *
 * Held at the 44px tap target even though it costs vertical space above the
 * fold, because one-handed use is the governing constraint here.
 */
type ChipProps = {
  active?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Chip({ active = false, children, className, ...props }: ChipProps) {
  return (
    <button
      {...props}
      type="button"
      aria-pressed={active}
      className={cn(
        'inline-flex h-tap shrink-0 select-none items-center justify-center',
        'whitespace-nowrap rounded-full border px-4 text-label',
        'transition-colors duration-chip',
        active
          ? 'border-accent bg-accent text-surface'
          : 'border-hairline bg-surface text-ink-700 hover:bg-paper',
        className,
      )}
    >
      {children}
    </button>
  );
}
