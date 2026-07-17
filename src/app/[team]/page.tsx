import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/primitives/Container';
import { SiteCredit } from '@/components/shared/SiteCredit';
import { MemberCard } from '@/components/team/MemberCard';
import { CHAPTER } from '@/data/chapter';
import { getLiveTeams, getMembersByTeam, getTeamBySlug } from '@/lib/members';
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
 *
 * No filter. Twelve members fit in a couple of thumb-flicks, and every control
 * that isn't there is one nobody has to understand. Removing it also made this
 * page a pure server component: /civil now ships no client JavaScript at all.
 *
 * Dark canvas, drafting grid, one accent per trade — the Civil section's own
 * identity, deliberately unlike the warm Pollachi home page.
 */
export default async function TeamPage({ params }: { params: Promise<Params> }) {
  const { team } = await params;
  const found = getTeamBySlug(team);
  if (!found || found.status !== 'live') notFound();

  const slug = found.slug as PowerTeamSlug;
  const members = getMembersByTeam(slug);
  const teamName = `${found.name} Power Team`;

  return (
    <main className="motif motif-grid min-h-screen bg-canvas pb-16">
      <Container width="wide">
        <header className="pb-8 pt-10">
          <p className="rise text-micro uppercase text-on-dark-3">
            {CHAPTER.name} · {CHAPTER.town}
          </p>
          <h1 className="rise rise-1 mt-3 font-display text-display-l text-on-dark">
            {found.name} Power Team
          </h1>
          {/* The whole context for someone who arrived from a water bottle. */}
          <p className="rise rise-2 mt-4 max-w-[34rem] text-body-l text-on-dark-2">
            {found.tagline}
          </p>
          <p className="rise rise-3 mt-6 text-meta text-on-dark-3">
            {members.length} members · tap anyone to see their profile
          </p>
        </header>

        {/*
          One column on a phone: at 375px a second column shrinks the portrait to
          a thumbnail and the profession to 11px, and profession is the thing
          people scan. Desktop has the room, so it uses it.

          `teamName` is "Civil Power Team", not "Civil" — that string lands
          verbatim in the prefilled WhatsApp message a member receives.
        */}
        <ul className="deal grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <li key={member.slug} className="flex">
              <MemberCard member={member} teamName={teamName} />
            </li>
          ))}
        </ul>

        <footer className="mt-12 border-t border-panel-line pt-6">
          <p className="text-meta text-on-dark-3">
            Part of {CHAPTER.name}, {CHAPTER.town}.{' '}
            <Link href="/" className="text-on-dark underline underline-offset-4">
              About the chapter
            </Link>
          </p>
          <div className="mt-3">
            <SiteCredit onDark />
          </div>
        </footer>
      </Container>
    </main>
  );
}
