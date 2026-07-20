/**
 * The trades in the Civil Power Team.
 *
 * Each carries its own accent and glyph. The colour is tied to the trade, not
 * the person, so it means something: on a page of twelve, the accent tells you
 * what someone does before you read their title.
 *
 * `icon` names a shape drawn in CategoryIcon.tsx. Kept as a union rather than an
 * emoji so the mark is line-work that matches the rest of the site — the brief
 * rules out emoji-heavy interfaces.
 */
export const PROFESSIONS = [
  { slug: 'builder', label: 'Builder / Contractor', accent: '#F5A623', icon: 'building' },
  { slug: 'tiles', label: 'Tiles & Granites', accent: '#F5A623', icon: 'grid' },
  { slug: 'interior-decorator', label: 'Interior Decorator', accent: '#8B5CF6', icon: 'roller' },
  { slug: 'hardware', label: 'Hardware', accent: '#7C3AED', icon: 'wrench' },
  { slug: 'water-systems', label: 'Water Systems', accent: '#2F80ED', icon: 'drop' },
  { slug: 'building-materials', label: 'Building Materials', accent: '#546376', icon: 'layers' },
  { slug: 'windows-doors', label: 'Windows & Doors', accent: '#D6336C', icon: 'window' },
  { slug: 'approvals', label: 'LPA / DTCP Approval', accent: '#0E9F6E', icon: 'stamp' },
  { slug: 'false-ceiling', label: 'False Ceiling', accent: '#C2410C', icon: 'ceiling' },
  { slug: 'painter', label: 'Painter', accent: '#0891B2', icon: 'brush' },
  { slug: 'cement-concrete', label: 'Cement / Concrete', accent: '#B45309', icon: 'mixer' },
  { slug: 'land-promoter', label: 'Land Promoter', accent: '#DC2626', icon: 'plot' },
  { slug: 'architecture', label: 'Architecture', accent: '#4F46E5', icon: 'grid' },
  { slug: 'curtains-nets', label: 'Curtains & Nets', accent: '#DB2777', icon: 'roller' },
] as const;

export type ProfessionSlug = (typeof PROFESSIONS)[number]['slug'];
export type CategoryIconName = (typeof PROFESSIONS)[number]['icon'];

export function professionLabel(slug: ProfessionSlug): string {
  return PROFESSIONS.find((p) => p.slug === slug)?.label ?? slug;
}

/** The trade's accent. Fed to CSS as a custom property, never as a Tailwind class. */
export function professionAccent(slug: ProfessionSlug): string {
  return PROFESSIONS.find((p) => p.slug === slug)?.accent ?? '#546376';
}

export function professionIcon(slug: ProfessionSlug): CategoryIconName {
  return PROFESSIONS.find((p) => p.slug === slug)?.icon ?? 'building';
}
