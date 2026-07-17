import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SaveContactButton } from '@/components/member/SaveContactButton';
import { ShareButton } from '@/components/member/ShareButton';
import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { SiteCredit } from '@/components/shared/SiteCredit';
import { CHAPTER, emailSubject, whatsappIntro } from '@/data/chapter';
import { professionLabel } from '@/data/professions';
import { mailtoLink, telLink, waLink } from '@/lib/links';
import {
  getLiveTeams,
  getMemberInTeam,
  getMembersByTeam,
  initials,
  whatsappNumber,
} from '@/lib/members';
import { buildVCard, vCardFilename } from '@/lib/vcard';
import type { PowerTeamSlug } from '@/types';

type Params = { team: string; slug: string };

export function generateStaticParams(): Params[] {
  return getLiveTeams().flatMap((team) =>
    getMembersByTeam(team.slug).map((m) => ({ team: team.slug, slug: m.slug })),
  );
}

function load(team: string, slug: string) {
  const teamData = getLiveTeams().find((t) => t.slug === team);
  if (!teamData) return null;
  const member = getMemberInTeam(teamData.slug as PowerTeamSlug, slug);
  if (!member) return null;
  return { team: teamData, member, teamName: `${teamData.name} Power Team` };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { team, slug } = await params;
  const data = load(team, slug);
  if (!data) return {};

  const { member, teamName } = data;
  const profession = professionLabel(member.profession);
  const title = `${member.name}, ${profession}`;
  const description = `${member.company}. ${member.idealReferral}`;
  const url = `/${team}/member/${slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    // Restated in full: Next replaces the root openGraph rather than merging,
    // so omitting these drops the preview image from every shared profile.
    openGraph: {
      type: 'profile',
      siteName: CHAPTER.name,
      locale: 'en_IN',
      title: `${member.name} — ${profession}`,
      description: `${member.company}. ${teamName}, ${CHAPTER.name}.`,
      url,
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: `${member.name}, ${profession}`,
        },
      ],
    },
  };
}

/**
 * A member profile.
 *
 * This is the shareable unit: most people who see it arrive from a link somebody
 * sent them, not from browsing. So it carries its own chapter framing and always
 * offers a way up to the team.
 */
export default async function MemberPage({ params }: { params: Promise<Params> }) {
  const { team, slug } = await params;
  const data = load(team, slug);
  if (!data) notFound();

  const { member, teamName } = data;
  const profession = professionLabel(member.profession);
  const wa = whatsappNumber(member);
  const profileUrl = `/${team}/member/${slug}/`;

  // Anything that leaves this page — a WhatsApp referral, a saved contact — needs
  // an absolute URL. A relative path is a dead string once it is out of the
  // browser, and it looks perfectly fine in local testing.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azpire.klyonix.in';
  const absoluteProfileUrl = `${siteUrl}${profileUrl}`;

  const vcard = buildVCard(member, {
    teamName,
    chapterName: CHAPTER.name,
    profileUrl: absoluteProfileUrl,
  });

  // Reads correctly with the URL appended or without it.
  const referText = `${member.name}, ${profession} at ${member.company}. Part of the ${CHAPTER.name} ${teamName}.`;

  return (
    // Same drafting grid as the team page: a profile reached from /civil should
    // feel like the same room.
    <main className="motif motif-grid min-h-screen pb-16">
      <Container>
        <div className="py-4">
          <Link
            href={`/${team}/`}
            className="inline-flex h-tap items-center text-meta text-ink-500 hover:text-ink"
          >
            ← {teamName}
          </Link>
        </div>

        <header>
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized
            <img
              src={member.photo}
              alt={member.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-24 w-24 items-center justify-center rounded border border-hairline bg-surface font-display text-[28px] text-ink-400"
            >
              {initials(member)}
            </div>
          )}

          <h1 className="rise rise-1 mt-5 font-display text-display-m text-ink">{member.name}</h1>
          <p className="rise rise-2 mt-1 text-body-l text-accent-ink">{profession}</p>

          <div className="mt-3 flex items-center gap-2">
            {member.companyLogo && (
              // eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized
              <img
                src={member.companyLogo}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            )}
            <p className="text-body text-ink-700">{member.company}</p>
          </div>
        </header>

        <div className="mt-6 flex gap-2">
          {wa && (
            <Button
              variant="primary"
              size="lg"
              href={waLink(wa, whatsappIntro(member.preferredName, teamName))}
              aria-label={`WhatsApp ${member.name}`}
              className="flex-1"
            >
              WhatsApp
            </Button>
          )}
          {member.contact.phone && (
            <Button
              variant="secondary"
              size="lg"
              href={telLink(member.contact.phone)}
              aria-label={`Call ${member.name}`}
              className="flex-1"
            >
              Call
            </Button>
          )}
        </div>

        {/* The highest-value block on the site, and the reason this is not a
            directory. Most member listings bury this field or omit it; it is the
            only one that speaks to the person doing the referring. */}
        <section className="rise rise-3 mt-10 border-l-2 border-accent pl-5">
          <h2 className="text-micro uppercase text-ink-400">Refer me when you hear</h2>
          <p className="mt-3 font-display text-quote italic text-ink">
            &ldquo;{member.idealReferral}&rdquo;
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-micro uppercase text-ink-400">About</h2>
          <p className="mt-3 text-body text-ink-700">{member.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-micro uppercase text-ink-400">Services</h2>
          {/* A plain list, not chips. Chips imply filterability that does not
              exist here, and a list that reads like a list is more scannable. */}
          <ul className="mt-2">
            {member.services.map((service) => (
              <li
                key={service}
                className="border-b border-hairline py-3 text-body text-ink-700 last:border-0"
              >
                {service}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 flex flex-col gap-2">
          <SaveContactButton vcard={vcard} filename={vCardFilename(member, CHAPTER.name)} />

          {/* wa.me with no number opens WhatsApp's contact picker. This turns
              "I know someone" into a two-tap referral, which is the entire point
              of a BNI chapter expressed as one link. */}
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            href={waLink(undefined, `${referText}\n${absoluteProfileUrl}`)}
          >
            Refer on WhatsApp
          </Button>

          <div className="mt-2 grid grid-cols-2 gap-2">
            {member.contact.email && (
              <Button
                href={mailtoLink(
                  member.contact.email,
                  emailSubject(teamName),
                  whatsappIntro(member.preferredName, teamName),
                )}
                aria-label={`Email ${member.name}`}
              >
                Email
              </Button>
            )}
            {member.contact.website && (
              <Button href={member.contact.website} target="_blank" rel="noopener noreferrer">
                Website
              </Button>
            )}
            {member.contact.mapsUrl && (
              <Button href={member.contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                Directions
              </Button>
            )}
            <ShareButton
              title={`${member.name}, ${profession}`}
              text={referText}
              url={profileUrl}
            />
          </div>
        </section>

        <footer className="mt-12 border-t border-hairline pt-6">
          <p className="text-meta text-ink-500">
            Member of {CHAPTER.name}, {CHAPTER.town}.
          </p>
          <Link
            href={`/${team}/`}
            className="mt-2 inline-flex h-tap items-center text-meta text-ink underline underline-offset-4"
          >
            See the whole {teamName}
          </Link>
          <div className="mt-3">
            <SiteCredit />
          </div>
        </footer>
      </Container>
    </main>
  );
}
