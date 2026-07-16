/**
 * Professions, declared once so members reference them instead of typing them
 * free-hand. Free text is how "Architect" and "Architecture" become two filter
 * chips for the same job.
 *
 * ProfessionSlug is derived from this list, so a typo in a member's profession
 * is a typecheck error.
 */
export const PROFESSIONS = [
  { slug: 'architect', label: 'Architect' },
  { slug: 'structural-engineer', label: 'Structural Engineer' },
  { slug: 'civil-contractor', label: 'Civil Contractor' },
  { slug: 'interior-designer', label: 'Interior Designer' },
  { slug: 'electrical-contractor', label: 'Electrical Contractor' },
  { slug: 'plumbing-contractor', label: 'Plumbing Contractor' },
  { slug: 'painting-contractor', label: 'Painting Contractor' },
  { slug: 'modular-kitchen', label: 'Modular Kitchen' },
  { slug: 'flooring-tiles', label: 'Flooring & Tiles' },
  { slug: 'aluminium-fabrication', label: 'Aluminium & Fabrication' },
  { slug: 'landscaping', label: 'Landscaping' },
  { slug: 'property-legal', label: 'Property Legal' },
] as const;

export type ProfessionSlug = (typeof PROFESSIONS)[number]['slug'];

export function professionLabel(slug: ProfessionSlug): string {
  return PROFESSIONS.find((p) => p.slug === slug)?.label ?? slug;
}
