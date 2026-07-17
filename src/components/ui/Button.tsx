import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

/**
 * The button system: Primary (filled), Secondary (outline), Ghost (minimal).
 *
 * Renders an <a> when `href` is present, otherwise a <button>. Contact actions
 * are overwhelmingly links (tel:, wa.me, mailto:), so anchors are the norm.
 *
 * Press feedback is CSS `:active`, not a JS gesture handler: it is instant, it
 * costs nothing, and it cannot strand an element mid-animation. Only `transform`
 * moves; the shadow is swapped between pre-defined tokens rather than
 * transitioned, because box-shadow is not a compositor property and animating it
 * repaints every frame.
 *
 * 48px minimum height throughout — Android's floor and WCAG 2.5.5, not just
 * iOS's 44.
 */
type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'default' | 'lg';

const VARIANTS: Record<Variant, string> = {
  // Filled buttons are Ink, never red. Red at button scale is the corporate
  // flyer signature this design avoids.
  primary: 'bg-ink text-surface shadow-card hover:bg-ink-700 active:shadow-card-press',
  secondary: 'border border-hairline bg-surface text-ink hover:bg-paper active:shadow-card-press',
  ghost: 'text-ink-700 hover:bg-paper hover:text-ink',
  // Official WhatsApp green (#25D366) is 1.98:1 with white and fails AA badly.
  // The mark keeps its official shape; the fill is our accessible green (5.21:1).
  whatsapp: 'bg-whatsapp text-white shadow-card hover:brightness-110 active:shadow-card-press',
};

const SIZES: Record<Size, string> = {
  default: 'h-tap px-4 text-label', // 48px
  lg: 'h-tap-lg px-6 text-label', // 56px — primary CTAs
};

const BASE =
  'relative inline-flex select-none items-center justify-center gap-2 rounded-xl font-sans ' +
  'transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-out ' +
  'active:scale-[0.97] ' +
  'disabled:pointer-events-none disabled:border-hairline disabled:bg-surface disabled:text-ink-200 disabled:shadow-none';

type Shared = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  /** Keeps the button's width and swaps the label for a spinner, so the layout
      never jumps and the label never disappears from the accessible tree. */
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

type AsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Shared> & { href?: undefined };
type AsAnchor = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Shared> & { href: string };

export type ButtonProps = AsButton | AsAnchor;

export function Button({
  variant = 'secondary',
  size = 'default',
  fullWidth = false,
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className);

  // The label stays rendered but invisible so the button keeps its width and its
  // accessible name; the spinner is layered over it.
  const body = loading ? (
    <>
      <span className="invisible">{children}</span>
      <span className="absolute inset-0 grid place-items-center">
        <Spinner className="h-5 w-5" />
      </span>
    </>
  ) : (
    children
  );

  if (typeof props.href === 'string') {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={classes} aria-busy={loading || undefined}>
        {body}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? 'button'}
      className={classes}
      disabled={buttonProps.disabled || loading}
      aria-busy={loading || undefined}
    >
      {body}
    </button>
  );
}
