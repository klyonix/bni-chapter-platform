import type { CategoryIconName } from '@/data/professions';

/**
 * A line-work mark per trade.
 *
 * Drawn rather than emoji: the brief rules out emoji-heavy interfaces, and emoji
 * render differently on every phone, which is the opposite of a considered mark.
 * All use currentColor, so each inherits its trade's accent from the card.
 *
 * 16px, 1.6 stroke, round caps — the same weight as the Pollachi grove and the
 * drafting grid, so the whole site's line-work belongs to one family. Each mark
 * is chosen to name its trade unambiguously and to differ clearly from every
 * other: no two trades share a glyph.
 */
const PATHS: Record<CategoryIconName, React.ReactNode> = {
  // Builder — a framed multi-storey building on the ground line.
  building: (
    <>
      <path d="M4 21V4.5A1 1 0 0 1 5 3.5h8a1 1 0 0 1 1 1V21" />
      <path d="M14 21V9.5h4a1 1 0 0 1 1 1V21" />
      <path d="M3 21h18" />
      <path d="M7 7.5h1.5M10.5 7.5H12M7 11h1.5M10.5 11H12M7 14.5h1.5M10.5 14.5H12M16 13.5h1.5M16 17h1.5" />
    </>
  ),
  // Tiles & granites — a laid grid.
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  // Interior decorator — a sofa.
  sofa: (
    <>
      <path d="M5 11V9.2A2.2 2.2 0 0 1 7.2 7h9.6A2.2 2.2 0 0 1 19 9.2V11" />
      <rect x="3" y="11" width="18" height="5.5" rx="2" />
      <path d="M3.4 11.5A2.2 2.2 0 0 1 5 13.6" />
      <path d="M20.6 11.5A2.2 2.2 0 0 0 19 13.6" />
      <path d="M6.5 16.5V18.5M17.5 16.5V18.5" />
    </>
  ),
  // Hardware — a nut and bolt.
  bolt: (
    <>
      <path d="M4 8.8 8 6.5l4 2.3v4.4L8 15.5l-4-2.3z" />
      <circle cx="8" cy="11" r="1.7" />
      <path d="M12 11h5" />
      <path d="M17 9.2 20.5 11 17 12.8z" />
      <path d="M13.5 9.6v2.8" />
    </>
  ),
  // Water systems — a tap with a falling drop.
  faucet: (
    <>
      <path d="M4 9h3v2.5H4z" />
      <path d="M7 10.25h5.5a2 2 0 0 1 2 2v.75" />
      <path d="M14.5 13v2" />
      <path d="M12 8h5M14.5 8V6.2" />
      <path d="M14.5 16.4s1.2 1.6 1.2 2.6a1.2 1.2 0 0 1-2.4 0c0-1 1.2-2.6 1.2-2.6z" />
    </>
  ),
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
  // Approvals — an approved document with a seal.
  stamp: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <circle cx="12" cy="14.5" r="3" />
      <path d="M10.7 14.6l1 1 2-2.2" />
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
  // Cement / concrete — a paper cement sack with a folded top and label bands.
  cementbag: (
    <>
      <path d="M7 7.5h10V19a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
      <path d="M7 7.5 8.5 4h7L17 7.5" />
      <path d="M9.5 4h5" />
      <path d="M9.5 11.5h5M9.5 14.5h5" />
    </>
  ),
  // Land promoter — a plot marked with a location pin.
  plot: (
    <>
      <path d="M4 20h16" />
      <path d="M12 3.5a4.2 4.2 0 0 0-4.2 4.2c0 3.2 4.2 7.3 4.2 7.3s4.2-4.1 4.2-7.3A4.2 4.2 0 0 0 12 3.5z" />
      <circle cx="12" cy="7.7" r="1.4" />
    </>
  ),
  // Architecture — a drafting compass.
  compass: (
    <>
      <circle cx="12" cy="4" r="1.4" />
      <path d="M11.3 5.1 6 20" />
      <path d="M12.7 5.1 18 20" />
      <path d="M17.2 17.5 19 21.5" />
      <path d="M8.4 16.7a6.2 6.2 0 0 0 7.2 0" />
    </>
  ),
  // Curtains & nets — two draped panels on a rod.
  curtain: (
    <>
      <path d="M3 4h18" />
      <path d="M8 4c-.3 6-2 8-2 15M8 4c.3 6 2 8 2 15" />
      <path d="M16 4c-.3 6-2 8-2 15M16 4c.3 6 2 8 2 15" />
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
