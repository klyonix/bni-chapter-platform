import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CompanyLogo } from '@/components/member/CompanyLogo';
import { SaveContactButton } from '@/components/member/SaveContactButton';
import { ShareButton } from '@/components/member/ShareButton';
import { CategoryBadge } from '@/components/premium-card/CategoryBadge';
import { themeFor } from '@/components/premium-card/categoryThemes';
import { PATTERNS } from '@/components/premium-card/patterns';
import { RevealAnimation } from '@/components/premium-card/RevealAnimation';
import { Container } from '@/components/primitives/Container';
import { SiteCredit } from '@/components/shared/SiteCredit';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { CHAPTER, emailSubject, whatsappIntro } from '@/data/chapter';
import { professionLabel } from '@/data/professions';
import { mailtoLink, telLink, waLink } from '@/lib/links';
import {
  getLiveTeams,
  getMemberInTeam,
  getMembersByTeam,
  getRelatedMembers,
  initials,
  whatsappNumber,
} from '@/lib/members';
import { buildVCard, vCardFilename } from '@/lib/vcard';
import type { Member, PowerTeamSlug } from '@/types';

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
 * A member profile, themed to their trade family.
 *
 * This is the shareable unit. Cards expand in place on /civil, so nobody
 * *browses* here — Share and Refer point here, because a link to a card cannot
 * preview a person. Most people who see this arrived from a link somebody sent
 * them, which is why it carries its own chapter framing and always offers a way
 * up to the team.
 *
 * ── Sections ─────────────────────────────────────────────────────────────────
 * Hero → contact → details → related → CTA. The hero and the primary contact
 * pair are above the fold and therefore use the CSS `.rise` animation, NOT
 * RevealAnimation: a reveal ships opacity:0 in the server HTML and a slow-JS
 * visitor would see a blank profile. Everything below the fold reveals on
 * scroll. That rule is in hooks/useReveal.ts.
 *
 * ── Content ──────────────────────────────────────────────────────────────────
 * Description, services and the referral ask are optional and render only if the
 * member actually wrote one. Today none of the twelve have, so this page is
 * mostly identity plus contact — which is honest. Nothing here is invented.
 */
export default async function MemberPage({ params }: { params: Promise<Params> }) {
  const { team, slug } = await params;
  const data = load(team, slug);
  if (!data) notFound();

  const { member, teamName } = data;
  const profession = professionLabel(member.profession);
  const theme = themeFor(member.profession);
  const accent = theme.accent;
  const wa = whatsappNumber(member);
  const profileUrl = `/${team}/member/${slug}/`;
  const related = getRelatedMembers(member, 3);

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
      className="relative min-h-screen bg-paper pb-24"
      style={
        {
          '--member-accent': theme.accent,
          '--member-accent-soft': theme.accentSoft,
        } as React.CSSProperties
      }
    >
      {/* The trade's pattern, behind the hero only, very low. Decoration, so
          aria-hidden and pointer-events off. */}
      <div
        aria-hidden="true"
        className="profile-wash"
        style={
          {
            '--card-pattern': PATTERNS[theme.pattern],
            '--card-gradient': theme.gradient,
          } as React.CSSProperties
        }
      />

      {/* Animated category aura: accent-coloured blobs that drift, breathe or
          orbit per the trade family's own idle. Decorative, behind everything. */}
      <div aria-hidden="true" className="profile-aura" data-motion={theme.iconMotion}>
        <div className="orbit">
          <b className="b1" />
          <b className="b2" />
          <b className="b3" />
        </div>
      </div>

      <Container>
        <div className="relative z-10 py-4">
          <Link
            href={`/${team}/`}
            className="press inline-flex h-tap items-center gap-2 text-meta text-ink-500 hover:text-ink"
          >
            <span aria-hidden="true">←</span> {teamName}
          </Link>
        </div>

        {/* ── Hero. Above the fold: CSS rise, never a reveal. ───────────────── */}
        <header className="relative z-10">
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized
            <img
              src={member.photo}
              alt={member.name}
              width={112}
              height={112}
              // Portraits are pre-cropped to a uniform head-and-shoulders square
              // (see docs/PORTRAIT-SPEC.md); the trade accent sits behind the
              // transparent cutout.
              className="rise h-28 w-28 rounded-3xl object-cover"
              style={{ background: accent }}
            />
          ) : (
            // Portraits are pending. Initials are a designed state — never a
            // grey person glyph, which reads as a broken image.
            <div
              aria-hidden="true"
              className="rise grid h-28 w-28 place-items-center rounded-full text-[30px] font-semibold text-white"
              style={{ background: accent }}
            >
              {initials(member)}
            </div>
          )}

          <h1 className="rise rise-1 mt-5 font-display text-display-m text-ink">{member.name}</h1>
          <div className="rise rise-2 mt-3">
            <CategoryBadge profession={member.profession} />
          </div>
          <p className="rise rise-3 mt-3 text-body-l text-ink-700">{member.company}</p>
          {/* Company logo, when supplied. Renders nothing otherwise. */}
          <CompanyLogo
            src={member.companyLogo}
            company={member.company}
            className="rise rise-3 mt-4 w-32"
          />
        </header>

        {/* ── Primary contact. Also above the fold — the point of the page. ─── */}
        <div className="rise rise-3 relative z-10 mt-8 flex gap-3">
          {wa && (
            <Button
              variant="whatsapp"
              size="lg"
              href={waLink(wa, whatsappIntro(member.preferredName, teamName))}
              aria-label={`WhatsApp ${member.name}`}
              className="flex-1"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
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
              <Icon name="phone" className="h-5 w-5" />
              Call
            </Button>
          )}
        </div>

        {/* ── Everything below here is scrolled to, so it may reveal. ───────── */}

        {/* The highest-value block on the site, and the reason this is not a
            directory. Every member listing buries this field or omits it; it is
            the only one that speaks to the person doing the referring.
            TODO(content): none of the twelve have written one yet. */}
        {member.idealReferral && (
          <RevealAnimation className="relative z-10">
            <section
              className="mt-12 rounded-[20px] border-l-2 bg-surface p-6 shadow-card"
              style={{ borderColor: accent }}
            >
              <h2 className="text-micro uppercase text-ink-400">Refer me when you hear</h2>
              <p className="mt-3 font-display text-quote italic text-ink">
                &ldquo;{member.idealReferral}&rdquo;
              </p>
            </section>
          </RevealAnimation>
        )}

        {member.description && (
          <RevealAnimation index={1} className="relative z-10">
            <section className="mt-8">
              <h2 className="text-micro uppercase text-ink-400">About</h2>
              <p className="mt-3 text-body text-ink-700">{member.description}</p>
            </section>
          </RevealAnimation>
        )}

        {member.services && member.services.length > 0 && (
          <RevealAnimation index={2} className="relative z-10">
            <section className="mt-8">
              <h2 className="text-micro uppercase text-ink-400">Services</h2>
              {/* A plain list, not chips. Chips imply filterability that does
                  not exist here, and a list that reads like a list is more
                  scannable. */}
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
          </RevealAnimation>
        )}

        {/* ── Details. Only rows that actually have a value. ────────────────── */}
        <RevealAnimation index={1} className="relative z-10">
          <section className="mt-12">
            <h2 className="text-micro uppercase text-ink-400">Details</h2>
            <dl className="mt-3 divide-y divide-hairline rounded-[20px] border border-hairline bg-surface">
              <DetailRow icon="person" label="Trade" value={profession} />
              <DetailRow icon="location" label="Based in" value={`${CHAPTER.town}, Tamil Nadu`} />
              {member.contact.phone && (
                <DetailRow
                  icon="phone"
                  label="Phone"
                  value={member.contact.phone}
                  href={telLink(member.contact.phone)}
                />
              )}
              {member.contact.email && (
                <DetailRow
                  icon="mail"
                  label="Email"
                  value={member.contact.email}
                  href={`mailto:${member.contact.email}`}
                />
              )}
            </dl>
          </section>
        </RevealAnimation>

        {/* ── All the actions. ─────────────────────────────────────────────── */}
        <RevealAnimation index={2} className="relative z-10">
          <section className="mt-8 flex flex-col gap-3">
            <SaveContactButton vcard={vcard} filename={vCardFilename(member, CHAPTER.name)} />

            {/* wa.me with no number opens WhatsApp's contact picker. This turns
                "I know someone" into a two-tap referral, which is the entire
                point of a BNI chapter expressed as one link. */}
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              href={waLink(undefined, `${referText}\n${absoluteProfileUrl}`)}
            >
              <Icon name="share" className="h-5 w-5" />
              Refer on WhatsApp
            </Button>

            <div className="grid grid-cols-2 gap-3">
              {member.contact.email && (
                <Button
                  href={mailtoLink(
                    member.contact.email,
                    emailSubject(teamName),
                    whatsappIntro(member.preferredName, teamName),
                  )}
                  aria-label={`Email ${member.name}`}
                >
                  <Icon name="mail" className="h-5 w-5" />
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
                  <Icon name="location" className="h-5 w-5" />
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
        </RevealAnimation>

        {/* ── Related. Same trade first, then same family. ──────────────────── */}
        {related.length > 0 && (
          <RevealAnimation index={3} className="relative z-10">
            <section className="mt-14">
              <h2 className="text-micro uppercase text-ink-400">Also in the {teamName}</h2>
              <ul className="mt-3 flex flex-col gap-3">
                {related.map((m) => (
                  <li key={m.slug}>
                    <RelatedRow member={m} team={team} />
                  </li>
                ))}
              </ul>
            </section>
          </RevealAnimation>
        )}

        <footer className="relative z-10 mt-16 border-t border-hairline pt-6">
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

/** One row of the details table. Links the value when there is somewhere to go. */
function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: 'person' | 'location' | 'phone' | 'mail';
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <Icon name={icon} className="text-ink-300 h-4 w-4 shrink-0" />
      <dt className="text-meta text-ink-400">{label}</dt>
      <dd className="ml-auto min-w-0 truncate text-meta text-ink-700">
        {href ? (
          <a href={href} className="hover:text-ink">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

/** A related member: themed, tappable, straight to their profile. */
function RelatedRow({ member, team }: { member: Member; team: string }) {
  const theme = themeFor(member.profession);
  return (
    <Link
      href={`/${team}/member/${member.slug}/`}
      className="press flex items-center gap-3 rounded-[20px] border border-hairline bg-surface p-3 shadow-card hover:border-ink-200"
    >
      <span
        aria-hidden="true"
        className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full text-meta font-semibold text-white"
        style={{ background: theme.accent }}
      >
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized
          <img src={member.photo} alt="" className="h-full w-full rounded-full object-cover" />
        ) : (
          initials(member)
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-label font-semibold text-ink">{member.name}</span>
        <span className="block truncate text-meta" style={{ color: theme.accent }}>
          {professionLabel(member.profession)}
        </span>
      </span>
      <Icon name="arrow-right" className="text-ink-300 h-4 w-4 shrink-0" />
    </Link>
  );
}
