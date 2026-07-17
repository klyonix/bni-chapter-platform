import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/primitives/Container';
import { SiteCredit } from '@/components/shared/SiteCredit';
import { ConstructionHero } from '@/components/team/ConstructionHero';
import { MemberGrid } from '@/components/team/MemberGrid';
import { CHAPTER } from '@/data/chapter';
import { getLiveTeams, getMembersByTeam, getTeamBySlug } from '@/lib/members';
import type { PowerTeamSlug } from '@/types';

type Params = { team: string };

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
    // Next replaces the root openGraph rather than merging into it, so these
    // have to be restated or a shared link previews with no image.
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
          alt: `${found.name} Power Team`,
        },
      ],
    },
  };
}

/**
 * The QR landing page, and the real front door — over 90% of traffic starts
 * here, not on the home page.
 *
 * No filter: twelve members fit in a couple of thumb-flicks, and every control
 * that isn't there is one nobody has to understand. No navigation either —
 * cards expand in place. The member pages still exist, and Share still points
 * at them, because a link to a card cannot preview a person.
 */
export default async function TeamPage({ params }: { params: Promise<Params> }) {
  const { team } = await params;
  const found = getTeamBySlug(team);
  if (!found || found.status !== 'live') notFound();

  const slug = found.slug as PowerTeamSlug;
  const members = getMembersByTeam(slug);
  const teamName = `${found.name} Power Team`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper pb-24">
      <ConstructionHero />

      {/* Everything sits above the fixed scene. */}
      <div className="relative z-10">
        <Container width="wide">
          {/* Tall enough to be a hero band: the construction scene is anchored to
              the top of the viewport and needs room to be seen before the cards
              start. Below this the cards cover it, and it fades out on scroll. */}
          <header className="flex min-h-[52vh] flex-col justify-end pb-10 pt-14">
            <p className="rise text-micro uppercase text-ink-400">
              {CHAPTER.name} · {CHAPTER.town}
            </p>
            <h1 className="rise rise-1 mt-3 text-balance font-display text-display-l text-ink">
              Our experts
            </h1>
            <p className="rise rise-2 mt-4 max-w-[34rem] text-body-l text-ink-700">
              {found.tagline}
            </p>
            <p className="rise rise-3 mt-6 text-meta text-ink-400">
              {members.length} members · tap a card to see contact details
            </p>
          </header>

          <MemberGrid members={members} teamName={teamName} />

          {/* End of the page: the frame tops out. */}
          <section className="mt-20 text-center">
            <TopOutMark />
            <p className="mt-6 text-balance font-display text-display-m text-ink">
              Building the future of {CHAPTER.town}, one project at a time.
            </p>
            <p className="mx-auto mt-4 max-w-[26rem] text-body text-ink-500">
              Every member here is vouched for by the rest of the chapter. That is the whole point
              of the room.
            </p>
          </section>

          <footer className="mt-16 border-t border-hairline pt-6">
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
      </div>
    </main>
  );
}

/**
 * The closing mark: a topping-out. The last beam is lifted into place and the
 * structure is complete — which is the note to end a page of builders on.
 * Draws itself when scrolled into view, once.
 */
function TopOutMark() {
  return (
    <svg
      viewBox="0 0 220 120"
      aria-hidden="true"
      className="topout text-ink-300 mx-auto h-24 w-auto"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path className="topout-line" d="M20 110h180" />
      <path className="topout-line" d="M55 110V45h110v65" />
      <path className="topout-line" d="M55 78h110M110 110V45" />
      <path className="topout-beam" d="M40 30h140" />
      <path className="topout-line" d="M110 30V12" />
      {/* The flag that goes up when the frame tops out. */}
      <path className="topout-flag" d="M110 12h26v14h-26z" />
    </svg>
  );
}
