import type { CategoryIconName } from '@/data/professions';

/**
 * A line-work mark per trade.
 *
 * Drawn rather than emoji: the brief rules out emoji-heavy interfaces, and emoji
 * render differently on every phone, which is the opposite of a considered mark.
 * All use currentColor, so each inherits its trade's accent from the card.
 *
 * 16px, 1.6 stroke, round caps — the same weight as the Pollachi grove and the
 * drafting grid, so the whole site's line-work belongs to one family.
 */
const PATHS: Record<CategoryIconName, React.ReactNode> = {
  // Builder — a building under construction.
  building: (
    <>
      <path d="M3 21h18M6 21V7l6-4 6 4v14" />
      <path d="M10 21v-5h4v5" />
    </>
  ),
  // Tiles — a laid grid.
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  // Interior decorator — a paint roller.
  roller: (
    <>
      <rect x="3" y="4" width="12" height="5" rx="1" />
      <path d="M15 6.5h4a2 2 0 0 1 2 2V12a2 2 0 0 1-2 2h-7" />
      <path d="M12 14v3M10.5 17h3v4h-3z" />
    </>
  ),
  // Hardware — a spanner.
  wrench: <path d="M15 3a5 5 0 0 0-4.6 7L3 17.4 6.6 21 14 13.6A5 5 0 1 0 15 3z" />,
  // Water systems — a droplet.
  drop: <path d="M12 3s6 6.4 6 10.5a6 6 0 0 1-12 0C6 9.4 12 3 12 3z" />,
  // Building materials — stacked layers.
  layers: (
    <>
      <path d="M12 3 2 8l10 5 10-5-10-5z" />
      <path d="M2 13l10 5 10-5M2 18l10 5 10-5" />
    </>
  ),
  // Windows & doors — a window.
  window: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M3 12h18M12 3v18" />
    </>
  ),
  // Approvals — an approved sheet.
  stamp: (
    <>
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M15 2v5h5" />
      <path d="M9.5 14.5l2 2 4-4.5" />
    </>
  ),
  // False ceiling — a ceiling plane with a downlight.
  ceiling: (
    <>
      <path d="M3 6h18M3 10h18" />
      <path d="M12 10v3" />
      <path d="M8.5 19a3.5 3.5 0 0 1 7 0z" />
    </>
  ),
  // Painter — a brush.
  brush: (
    <>
      <path d="M5 3h14v6H5z" />
      <path d="M12 9v4" />
      <path d="M9.5 13h5v5a2.5 2.5 0 0 1-5 0z" />
    </>
  ),
  // Cement — a mixer drum.
  mixer: (
    <>
      <path d="M3 8l9-3 9 3-9 3-9-3z" />
      <path d="M3 8v5l9 3 9-3V8" />
      <circle cx="7" cy="20" r="2" />
      <circle cx="17" cy="20" r="2" />
    </>
  ),
  // Land promoter — a surveyed plot.
  plot: (
    <>
      <path d="M3 20V6l6 3 6-3 6 3v11l-6-3-6 3-6-3z" />
      <path d="M9 9v11M15 6v11" />
    </>
  ),
};

export function CategoryIcon({ name, className }: { name: CategoryIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
