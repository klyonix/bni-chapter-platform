import Link from 'next/link';
import { Button } from '@/components/primitives/Button';
import { whatsappIntro } from '@/data/chapter';
import { professionAccent, professionLabel } from '@/data/professions';
import { telLink, waLink } from '@/lib/links';
import { initials, whatsappNumber } from '@/lib/members';
import type { Member } from '@/types';

/**
 * A member at scan distance, themed to their trade.
 *
 * The accent is set as a CSS custom property because it is data, not a design
 * token — Tailwind can only emit classes it can see in source, and the colour
 * comes from the profession registry at runtime.
 *
 * The whole card opens the profile, but the card is not an <a>: WhatsApp and
 * Call sit inside it, and an anchor inside an anchor is invalid and breaks
 * keyboard navigation. Instead the name is the single real link and its ::after
 * stretches over the card. Screen readers get one clean link, the whole surface
 * stays tappable, and the action buttons need no click handlers.
 *
 * The name appears once. The reference layout prints it twice per card — as a
 * banner and again beside a small avatar — which is duplication, not hierarchy.
 */
export function MemberCard({ member, teamName }: { member: Member; teamName: string }) {
  const wa = whatsappNumber(member);
  const profession = professionLabel(member.profession);
  const accent = professionAccent(member.profession);

  return (
    <article
      // w-full matters: the parent <li> is a flex container, so without it the
      // card shrink-wraps its content and every card ends up a different width.
      className="member-card press flex h-full w-full flex-col gap-4 rounded p-4"
      style={{ '--member-accent': accent } as React.CSSProperties}
    >
      <div className="flex items-start gap-4">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized
          <img
            src={member.photo}
            alt={member.name}
            width={64}
            height={64}
            className="member-figure h-16 w-16 shrink-0 rounded object-cover"
          />
        ) : (
          // Portraits are pending. Initials are a designed state — never a grey
          // person glyph, which reads as a broken image.
          <div
            aria-hidden="true"
            className="member-figure flex h-16 w-16 shrink-0 items-center justify-center rounded font-display text-[20px]"
            style={{ color: accent }}
          >
            {initials(member)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h2 className="text-label font-semibold text-on-dark">
            <Link
              href={`/civil/member/${member.slug}/`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {member.name}
            </Link>
          </h2>
          {/* The scan key. Nobody arrives wondering what Ramesh is doing; they
              arrive needing a structural engineer. */}
          <p className="mt-0.5 text-label" style={{ color: accent }}>
            {profession}
          </p>
          <p className="mt-1 truncate text-meta text-on-dark-3">{member.company}</p>
        </div>
      </div>

      {/* Above the stretched link, so these win the tap. Two actions, not five:
          the rest live on the profile, where they have room to be tiered. */}
      <div className="relative z-10 mt-auto flex gap-2">
        {wa && (
          <Button
            variant="whatsapp"
            href={waLink(wa, whatsappIntro(member.preferredName, teamName))}
            aria-label={`WhatsApp ${member.name}`}
            className="flex-1"
          >
            WhatsApp
          </Button>
        )}
        {member.contact.phone && (
          <Button
            variant="onDark"
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
