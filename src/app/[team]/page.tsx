import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/primitives/Container';
import { SiteCredit } from '@/components/shared/SiteCredit';
import { TeamBrowser } from '@/components/team/TeamBrowser';
import { CHAPTER } from '@/data/chapter';
import {
  getLiveTeams,
  getMembersByTeam,
  getProfessionsForTeam,
  getTeamBySlug,
} from '@/lib/members';
import type { PowerTeamSlug } from '@/types';

type Params = { team: string };

/**
 * Only live teams get built. Adding /manufacturing means flipping its status in
 * src/data/teams.ts and registering its members — no route work.
 */
export function generateStaticParams(): Params[] {
  return getLiveTeams().map((t) => ({ team: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { team } = await params;
  const found = getTeamBySlug(team);
  if (!found) return {};
  return {
    title: found.seo.title,
    description: found.seo.description,
    alternates: { canonical: `/${found.slug}/` },
    // Next.js replaces the root `openGraph` object rather than merging into it,
    // so siteName/images/type have to be restated or a shared link previews
    // with no image. Silent, and only visible once someone pastes the URL.
    openGraph: {
      type: 'website',
      siteName: CHAPTER.name,
      locale: 'en_IN',
      title: `${found.name} Power Team | ${CHAPTER.name}`,
      description: found.seo.description,
      url: `/${found.slug}/`,
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: `${found.name} Power Team, ${CHAPTER.name}`,
        },
      ],
    },
  };
}

/**
 * The QR landing page, and the real front door — over 90% of traffic starts
 * here, not on the home page. It has to introduce itself to a stranger without
 * pushing the members below the fold.
 */
export default async function TeamPage({ params }: { params: Promise<Params> }) {
  const { team } = await params;
  const found = getTeamBySlug(team);
  if (!found || found.status !== 'live') notFound();

  const slug = found.slug as PowerTeamSlug;
  const members = getMembersByTeam(slug);
  const professions = getProfessionsForTeam(slug);

  return (
    <main className="motif motif-grid min-h-screen pb-16">
      <Container>
        <header className="pb-6 pt-10">
          <p className="rise text-micro uppercase text-ink-400">
            {CHAPTER.name} · {CHAPTER.town}
          </p>
          <h1 className="rise rise-1 mt-3 font-display text-display-l text-ink">
            {found.name}
            <br />
            Power Team
          </h1>
          {/* The whole context for someone who arrived from a water bottle. */}
          <p className="rise rise-2 mt-4 max-w-[28rem] text-body-l text-ink-700">{found.tagline}</p>
        </header>

        {/* "Civil Power Team", not "Civil" — this string lands verbatim in the
            prefilled WhatsApp message a member receives. */}
        <TeamBrowser
          members={members}
          professions={professions}
          teamName={`${found.name} Power Team`}
        />

        <footer className="mt-12 border-t border-hairline pt-6">
          <p className="text-meta text-ink-500">
            Part of {CHAPTER.name}, {CHAPTER.town}.{' '}
            <Link href="/" className="text-ink underline underline-offset-4">
              About the chapter
            </Link>
          </p>
          <div className="mt-3">
            <SiteCredit />
          </div>
        </footer>
      </Container>
    </main>
  );
}
