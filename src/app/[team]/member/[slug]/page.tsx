import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SaveContactButton } from '@/components/member/SaveContactButton';
import { ShareButton } from '@/components/member/ShareButton';
import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { SiteCredit } from '@/components/shared/SiteCredit';
import { CategoryIcon } from '@/components/team/CategoryIcon';
import { CHAPTER, emailSubject, whatsappIntro } from '@/data/chapter';
import { professionAccent, professionIcon, professionLabel } from '@/data/professions';
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
  const url = `/${team}/member/${slug}/`;
  const description = member.idealReferral
    ? `${member.company}. ${member.idealReferral}`
    : `${member.company}. ${profession} in ${CHAPTER.town}, and a member of ${CHAPTER.name}.`;

  return {
    title: `${member.name}, ${profession}`,
    description,
    alternates: { canonical: url },
    // Next replaces the root openGraph rather than merging, so omitting these
    // drops the preview image from every shared profile.
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
 * This is the shareable unit. Cards expand in place on /civil, so nobody
 * *browses* to this page — but Share and Refer point here, because a link to a
 * card cannot preview a person. Most people who see this arrived from a link
 * somebody sent them, which is why it carries its own chapter framing and always
 * offers a way up to the team.
 *
 * Description, services and the referral ask are all optional and render only
 * when the member has actually written one. Nothing here is invented.
 */
export default async function MemberPage({ params }: { params: Promise<Params> }) {
  const { team, slug } = await params;
  const data = load(team, slug);
  if (!data) notFound();

  const { member, teamName } = data;
  const profession = professionLabel(member.profession);
  const accent = professionAccent(member.profession);
  const wa = whatsappNumber(member);
  const profileUrl = `/${team}/member/${slug}/`;

  // Anything that leaves this page — a WhatsApp referral, a saved contact —
  // needs an absolute URL. A relative path is a dead string once it is out of
  // the browser, and it looks perfectly fine in local testing.
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
    <main
      className="min-h-screen bg-paper pb-16"
      style={{ '--member-accent': accent } as React.CSSProperties}
    >
      <Container>
        <div className="py-4">
          <Link
            href={`/${team}/`}
            className="press inline-flex h-tap items-center text-meta text-ink-500 hover:text-ink"
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
              className="h-24 w-24 rounded-2xl object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="grid h-24 w-24 place-items-center rounded-full text-[26px] font-semibold text-white"
              style={{ background: accent }}
            >
              {initials(member)}
            </div>
          )}

          <h1 className="rise rise-1 mt-5 font-display text-display-m text-ink">{member.name}</h1>
          <p
            className="rise rise-2 mt-2 flex items-center gap-2 text-micro uppercase"
            style={{ color: accent }}
          >
            <CategoryIcon name={professionIcon(member.profession)} className="h-4 w-4" />
            {profession}
          </p>
          <p className="mt-2 text-body text-ink-700">{member.company}</p>
        </header>

        <div className="mt-6 flex gap-2">
          {wa && (
            <Button
              variant="whatsapp"
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
            directory. Every member listing buries this field or omits it; it is
            the only one that speaks to the person doing the referring.
            TODO(content): none of the twelve have written one, so it shows for
            nobody today. Collecting these is the biggest job left. */}
        {member.idealReferral && (
          <section className="mt-10 border-l-2 pl-5" style={{ borderColor: accent }}>
            <h2 className="text-micro uppercase text-ink-400">Refer me when you hear</h2>
            <p className="mt-3 font-display text-quote italic text-ink">
              &ldquo;{member.idealReferral}&rdquo;
            </p>
          </section>
        )}

        {member.description && (
          <section className="mt-10">
            <h2 className="text-micro uppercase text-ink-400">About</h2>
            <p className="mt-3 text-body text-ink-700">{member.description}</p>
          </section>
        )}

        {member.services && member.services.length > 0 && (
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
        )}

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
