import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Tiered action button. The tiers encode what we want to happen, in order
 * (plan §5.2): filled primary, WhatsApp, then outlined secondary. Presenting
 * every action at equal weight is how directories look.
 *
 * Renders an <a> when `href` is present, otherwise a <button>. Contact actions
 * are overwhelmingly links (tel:, wa.me, mailto:), so anchors are the norm.
 */
type Variant = 'primary' | 'whatsapp' | 'secondary';
type Size = 'default' | 'lg';

const VARIANTS: Record<Variant, string> = {
  // Filled buttons are Ink, never red. Red at button scale is the corporate
  // flyer signature the design is avoiding (plan §7).
  primary: 'bg-ink text-surface hover:bg-ink-700',
  whatsapp: 'bg-whatsapp text-surface hover:bg-whatsapp/90',
  secondary: 'border border-hairline bg-surface text-ink hover:bg-paper',
};

const SIZES: Record<Size, string> = {
  default: 'h-tap px-4 text-label', // 44px — plan §13 minimum tap target
  lg: 'h-tap-lg px-5 text-label', // 48px — primary profile actions
};

const BASE =
  'inline-flex select-none items-center justify-center gap-2 rounded ' +
  'font-sans transition-colors duration-tap ' +
  'disabled:cursor-not-allowed disabled:border-hairline disabled:bg-surface disabled:text-ink-200';

type SharedProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type AsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: undefined;
  };

type AsAnchor = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string;
  };

export type ButtonProps = AsButton | AsAnchor;

export function Button({
  variant = 'secondary',
  size = 'default',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className);

  if (typeof props.href === 'string') {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} type={buttonProps.type ?? 'button'} className={classes}>
      {children}
    </button>
  );
}
