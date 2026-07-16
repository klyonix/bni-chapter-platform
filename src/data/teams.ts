import type { PowerTeam } from '@/types';

/**
 * Power team registry.
 *
 * Adding /manufacturing is an entry here plus a member file — not a new route.
 * `generateStaticParams` reads `status: 'live'` from this list (plan §10).
 *
 * Coming-soon teams render as muted, non-interactive rows on the home page.
 * They are never links: a dead link on a trust page costs more than an absent one.
 */
export const TEAMS: PowerTeam[] = [
  {
    slug: 'civil',
    name: 'Civil',
    // Written for a stranger who scanned a code on a water bottle and has no
    // idea what BNI or a "power team" is. No internal language, no claims.
    tagline: 'Twelve professionals who design, build and finish spaces in Coimbatore.',
    status: 'live',
    seo: {
      title: 'Civil Power Team',
      description:
        'Architects, engineers and contractors of the BNI Azpire chapter in Coimbatore Rural. Find the right professional and contact them directly.',
    },
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    tagline: '',
    status: 'coming-soon',
    seo: { title: 'Manufacturing Power Team', description: '' },
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: '',
    status: 'coming-soon',
    seo: { title: 'Healthcare Power Team', description: '' },
  },
  {
    slug: 'finance',
    name: 'Finance',
    tagline: '',
    status: 'coming-soon',
    seo: { title: 'Finance Power Team', description: '' },
  },
];
