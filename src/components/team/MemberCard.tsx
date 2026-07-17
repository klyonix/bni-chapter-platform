import Link from 'next/link';
import { whatsappIntro } from '@/data/chapter';
import { professionLabel } from '@/data/professions';
import { telLink, waLink } from '@/lib/links';
import { initials, whatsappNumber } from '@/lib/members';
import type { Member } from '@/types';
import { Button } from '@/components/primitives/Button';

/**
 * A member at scan distance.
 *
 * The whole card opens the profile, but the card is not an <a>: WhatsApp and
 * Call sit inside it, and an anchor inside an anchor is invalid and breaks
 * keyboard navigation. Instead the name is the single real link and its
 * ::after stretches over the card. Screen readers get one clean link, the
 * whole surface stays tappable, and the action buttons need no click handlers.
 */
export function MemberCard({ member, teamName }: { member: Member; teamName: string }) {
  const wa = whatsappNumber(member);
  const profession = professionLabel(member.profession);

  return (
    <article className="relative flex flex-col gap-4 rounded border border-hairline bg-surface p-4 shadow-card transition-colors duration-tap hover:border-ink-200">
      <div className="flex items-start gap-4">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized
          <img
            src={member.photo}
            alt={member.name}
            width={72}
            height={72}
            className="h-[72px] w-[72px] shrink-0 rounded object-cover"
          />
        ) : (
          // Portraits are pending. Initials are a designed state — never a grey
          // person glyph, which reads as a broken image.
          <div
            aria-hidden="true"
            className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded border border-hairline bg-paper font-display text-[22px] text-ink-400"
          >
            {initials(member)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h2 className="text-label font-semibold text-ink">
            <Link
              href={`/civil/member/${member.slug}/`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {member.name}
            </Link>
          </h2>
          {/* The scan key. Nobody arrives wondering what Ramesh is doing; they
              arrive needing a structural engineer. */}
          <p className="mt-0.5 text-label text-accent-ink">{profession}</p>
          <p className="mt-1 truncate text-meta text-ink-500">{member.company}</p>
        </div>
      </div>

      {/* Above the stretched link, so these win the tap. */}
      <div className="relative z-10 flex gap-2">
        {wa && (
          <Button
            variant="primary"
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
            href={telLink(member.contact.phone)}
            aria-label={`Call ${member.name}`}
            className="flex-1"
          >
            Call
          </Button>
        )}
      </div>
    </article>
  );
}
