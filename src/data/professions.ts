/**
 * Professions, declared once so members reference them instead of typing them
 * free-hand. Free text is how "Architect" and "Architecture" become two filter
 * chips for the same job.
 *
 * ProfessionSlug is derived from this list, so a typo in a member's profession
 * is a typecheck error.
 */
/**
 * Each profession carries its own accent.
 *
 * The colour is tied to the trade, not to the person, so it means something: on
 * a page of twelve, the accent tells you what someone does before you read their
 * title, and two contractors read as the same kind of work. Assigning colours
 * per member instead would be decoration.
 *
 * Tuned for the dark card on /civil (#131E33). All twelve are measured AA as
 * text against it, 5.5:1 to 10:1 — re-measure if any of them change. Vivid but
 * not neon: these sit on deep navy, and fluorescent accents on dark read as a
 * gamer dashboard, not a chapter of professionals.
 */
export const PROFESSIONS = [
  { slug: 'architect', label: 'Architect', accent: '#E8A33D' }, // amber, drafting pencil
  { slug: 'structural-engineer', label: 'Structural Engineer', accent: '#5AA9FF' }, // steel blue
  { slug: 'civil-contractor', label: 'Civil Contractor', accent: '#F2854A' }, // site orange
  { slug: 'interior-designer', label: 'Interior Designer', accent: '#EF7B9B' }, // rose
  { slug: 'electrical-contractor', label: 'Electrical Contractor', accent: '#F2C438' }, // live yellow
  { slug: 'plumbing-contractor', label: 'Plumbing Contractor', accent: '#4FCFEC' }, // water cyan
  { slug: 'painting-contractor', label: 'Painting Contractor', accent: '#B48BEF' }, // violet
  { slug: 'modular-kitchen', label: 'Modular Kitchen', accent: '#48D8B4' }, // teal
  { slug: 'flooring-tiles', label: 'Flooring & Tiles', accent: '#D2B183' }, // sand
  { slug: 'aluminium-fabrication', label: 'Aluminium & Fabrication', accent: '#9CB0CC' }, // steel
  { slug: 'landscaping', label: 'Landscaping', accent: '#6FDC8A' }, // green
  { slug: 'property-legal', label: 'Property Legal', accent: '#F06A6A' }, // red
] as const;

export type ProfessionSlug = (typeof PROFESSIONS)[number]['slug'];

export function professionLabel(slug: ProfessionSlug): string {
  return PROFESSIONS.find((p) => p.slug === slug)?.label ?? slug;
}

/** The trade's accent. Fed to CSS as a custom property, never as a Tailwind class. */
export function professionAccent(slug: ProfessionSlug): string {
  return PROFESSIONS.find((p) => p.slug === slug)?.accent ?? '#9CB0CC';
}
