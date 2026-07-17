import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { Hairline } from '@/components/primitives/Section';
import { SiteCredit } from '@/components/shared/SiteCredit';
import { MarketMark } from '@/components/home/MarketMark';
import { PollachiHorizon } from '@/components/home/PollachiHorizon';
import { RidgeRule } from '@/components/home/RidgeRule';
import { CHAPTER } from '@/data/chapter';
import { getMembersByTeam, getTeams } from '@/lib/members';

/**
 * Chapter home.
 *
 * Not the front door — most traffic lands on /civil from a QR code. This is the
 * page people reach when they want context after being impressed, and the page
 * search engines index.
 *
 * The hero is left-aligned on purpose. A centred headline over a centred subhead
 * over a centred pill button is the most recognisable template layout on the web,
 * and this chapter should not look like a template.
 */
export default function HomePage() {
  const teams = getTeams();
  const meetingConfirmed = CHAPTER.meeting.day !== 'TBC';

  return (
    <main className="min-h-screen pb-16">
      <Container>
        <section className="pt-16">
          {/* A dateline, not a tagline: where these people are and since when.
              Founding year does quiet trust work that no adjective can. */}
          <p className="rise text-micro uppercase text-ink-400">{CHAPTER.name} · Founded 2019</p>
          {/* text-balance evens the line lengths instead of leaving "work."
              orphaned on its own line. A hand-placed <br> only ever looks right
              at one width. */}
          <h1 className="rise rise-1 mt-4 text-balance font-display text-display-l text-ink">
            A room of professionals who send each other work.
          </h1>
          <p className="rise rise-2 mt-5 max-w-[30rem] text-body-l text-ink-700">
            {meetingConfirmed
              ? `We meet every ${CHAPTER.meeting.day} in ${CHAPTER.town}.`
              : `${CHAPTER.name} is a BNI chapter in ${CHAPTER.town}, at the foot of the Western Ghats.`}{' '}
            Members spend the week looking for work to pass to each other.
          </p>

          {/* Points at the thing that actually exists and proves the claim,
              rather than a generic "Learn more". */}
          <Link
            href="/civil/"
            className="press rise rise-3 mt-8 inline-flex h-tap-lg items-center rounded bg-ink px-5 text-label text-surface hover:bg-ink-700"
          >
            Meet the Civil team
          </Link>

          {/* The landscape sits below the copy, full width, edge to edge on a
              phone. It is the identity, so it gets room; the copy is the page,
              so it comes first and is never set over the drawing. -mx-5 cancels
              the Container gutter to reach both screen edges. */}
          <div className="rise rise-3 -mx-5 mt-12 w-[calc(100%+2.5rem)]">
            <PollachiHorizon />
          </div>
        </section>

        <RidgeRule />

        <section className="py-12">
          <h2 className="text-micro uppercase text-ink-400">What BNI is</h2>
          <p className="mt-4 text-body text-ink-700">
            BNI has been running since 1985. A group of business owners meets every week, and each
            member looks for work to hand to the others.
          </p>
          <p className="mt-4 text-body text-ink-700">
            Only one person per profession sits in a chapter. The architect is the only architect.
            That exclusivity is what makes a referral worth something.
          </p>
        </section>

        <Hairline />

        <section className="py-12">
          {/* This is where "power team" gets explained. It is BNI-internal
              language and a QR visitor has no idea what it means. */}
          <h2 className="text-micro uppercase text-ink-400">What Azpire is</h2>
          <p className="mt-4 text-body text-ink-700">
            Azpire is the BNI chapter in {CHAPTER.town}, part of the {CHAPTER.region} region. Its
            members are grouped into power teams: small sets of businesses whose work naturally
            overlaps.
          </p>
          <p className="mt-4 text-body text-ink-700">
            An architect, a structural engineer and a contractor meet the same customer at three
            different moments. Put them in one room and a referral costs nobody anything.
          </p>

          {/* The old market arcade: heritage as an anchor for the place, kept
              small and to one side so it reads as a mark, not an illustration. */}
          <div className="mt-8 max-w-[220px] text-ink-400">
            <MarketMark />
          </div>
        </section>

        <Hairline />

        <section className="py-12">
          <h2 className="text-micro uppercase text-ink-400">Why members join</h2>
          <p className="mt-4 text-body text-ink-700">
            You meet the same people every week. They learn what you actually do, rather than what
            fits on a card.
          </p>
          <p className="mt-4 text-body text-ink-700">
            Then they start recognising your work in other people&rsquo;s conversations. It is slow,
            and it compounds.
          </p>
        </section>

        <Hairline />

        <section className="py-12">
          <h2 className="text-micro uppercase text-ink-400">Power teams</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {teams.map((team) => {
              const count = getMembersByTeam(team.slug).length;

              // Coming-soon teams are muted rows, never links. A dead link on a
              // page selling trustworthiness costs more than an absent one.
              if (team.status !== 'live') {
                return (
                  <li
                    key={team.slug}
                    className="flex items-center justify-between rounded border border-hairline px-4 py-4"
                  >
                    <span className="text-label text-ink-400">{team.name}</span>
                    <span className="text-meta text-ink-400">Coming soon</span>
                  </li>
                );
              }

              return (
                <li key={team.slug}>
                  <Link
                    href={`/${team.slug}/`}
                    className="press flex items-center justify-between rounded border border-hairline bg-surface px-4 py-4 hover:border-ink-200"
                  >
                    <span>
                      <span className="block text-label text-ink">{team.name}</span>
                      <span className="mt-0.5 block text-meta text-ink-500">
                        {count} professionals
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-ink-400">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <RidgeRule />

        <section className="py-12">
          <h2 className="font-display text-display-m text-ink">Come and see it</h2>
          <p className="mt-4 max-w-[30rem] text-body text-ink-700">
            Visitors sit in on a full meeting before anyone asks them anything. The chapter website
            has the dates and the details.
          </p>
          <a
            href={CHAPTER.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-tap items-center text-label text-ink underline underline-offset-4"
          >
            Official chapter website
          </a>
        </section>

        <footer className="border-t border-hairline pt-6">
          <SiteCredit />
        </footer>
      </Container>
    </main>
  );
}
