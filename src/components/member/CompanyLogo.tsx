import { cn } from '@/utils/cn';

/**
 * A member's company logo, in a uniform chip.
 *
 * The image is pre-composited on its own background — white, or a matching dark
 * for a light-on-dark logo — at a fixed 8:5 ratio with consistent padding, so
 * twelve heterogeneous source logos read as one set regardless of their shape,
 * colour or (often baked-in) background. See docs/PORTRAIT-SPEC.md.
 *
 * Renders nothing when a member has no logo (e.g. Lakchan Associates), so the
 * caller never has to guard — the chip simply does not appear.
 */
export function CompanyLogo({
  src,
  company,
  className,
}: {
  src?: string;
  company: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    <span
      className={cn(
        'block overflow-hidden rounded-xl border border-hairline bg-white shadow-card',
        className,
      )}
      style={{ aspectRatio: '8 / 5' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized */}
      <img
        src={src}
        alt={`${company} logo`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </span>
  );
}
