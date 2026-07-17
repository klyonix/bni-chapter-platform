import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Tiered action button. The tiers encode what we want to happen, in order
 * (plan §5.2): filled primary, WhatsApp, then outlined secondary. Presenting
 * every action at equal weight is how directories look.
 *
 * Renders an <a> when `href` is present, otherwise a <button>. Contact actions
 * are overwhelmingly links (tel:, wa.me, mailto:), so anchors are the norm.
 *
 * `press` supplies the tap response in CSS — see docs/MOTION.md. That keeps this
 * a server component, so the member profile ships no client JS for its buttons.
 */
type Variant = 'primary' | 'whatsapp' | 'secondary' | 'onDark' | 'onDarkSolid';
type Size = 'default' | 'lg';

const VARIANTS: Record<Variant, string> = {
  // Filled buttons are Ink, never red. Red at button scale is the corporate
  // flyer signature the design is avoiding (plan §7).
  primary: 'bg-ink text-surface hover:bg-ink-700',
  // Green earns its place on the dark canvas, where it reads as the WhatsApp
  // convention rather than fighting the red accent as it did on the light page.
  // #0F7A6E, not brand #128C7E, which fails AA against white at 4.14:1.
  whatsapp: 'bg-whatsapp text-white hover:brightness-110',
  secondary: 'border border-hairline bg-surface text-ink hover:bg-paper',
  // Civil section. Outlined against the panel, so it recedes behind WhatsApp.
  onDark: 'border border-panel-line bg-canvas/60 text-on-dark hover:border-on-dark-3',
  onDarkSolid: 'bg-on-dark text-canvas hover:brightness-90',
};

const SIZES: Record<Size, string> = {
  default: 'h-tap px-4 text-label', // 44px — plan §13 minimum tap target
  lg: 'h-tap-lg px-5 text-label', // 48px — primary profile actions
};

const BASE =
  'press inline-flex select-none items-center justify-center gap-2 rounded font-sans ' +
  'disabled:cursor-not-allowed disabled:border-hairline disabled:bg-surface disabled:text-ink-200';

type SharedProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type AsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & { href?: undefined };

type AsAnchor = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & { href: string };

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
