import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/primitives/Container';
import { SiteCredit } from '@/components/shared/SiteCredit';
import { TeamHero } from '@/components/team/TeamHero';
import { ToppingOut } from '@/components/team/ToppingOut';
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
  const tradeCount = new Set(members.map((m) => m.profession)).size;

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper pb-24">
      <div className="relative z-10">
        <Container width="wide">
          <TeamHero
            eyebrow={`${CHAPTER.name} · ${CHAPTER.town}`}
            heading="Our experts"
            description={found.tagline}
            stats={[
              { value: members.length, label: 'Members' },
              { value: tradeCount, label: 'Trades' },
            ]}
            ctaLabel="Meet the team"
            ctaHref="#members"
          />

          <p className="mt-4 text-meta text-ink-400">
            {members.length} members · tap a card to see contact details
          </p>

          <div id="members" className="mt-8 scroll-mt-20">
            <MemberGrid members={members} teamName={teamName} />
          </div>

          {/* End of the page: the line first, then the drawing as a full-bleed
              band beneath it. Stacked, never layered — text over a moving
              illustration is unreadable, and "fix it with the font" would just be
              a slower way of finding that out. */}
          <section className="mt-20 text-center">
            <p className="text-balance font-display text-display-m text-ink">
              Together We Build. Together We Grow.
            </p>
            <p className="mx-auto mt-4 max-w-[26rem] text-body text-ink-500">
              Every member here is vouched for by the rest of the chapter. That is the whole point
              of the room.
            </p>

            {/* Edge to edge on a phone: -mx-5 cancels the Container's px-5 gutter
                so the band reaches both screen edges. A band wants the full width
                at every size, so unlike the tractor it replaces there is no
                desktop clamp — it just keeps the gutter back once there is one. */}
            <div className="-mx-5 mt-8 w-[calc(100%+2.5rem)] sm:mx-0 sm:mt-10 sm:w-full">
              <ToppingOut />
            </div>
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
