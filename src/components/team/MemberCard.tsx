'use client';

import { useId, useState } from 'react';
import { CategoryIcon } from '@/components/team/CategoryIcon';
import { CHAPTER, whatsappIntro } from '@/data/chapter';
import { professionAccent, professionIcon, professionLabel } from '@/data/professions';
import { telLink, waLink } from '@/lib/links';
import { initials, whatsappNumber } from '@/lib/members';
import { buildVCard, vCardFilename } from '@/lib/vcard';
import type { Member } from '@/types';

/**
 * An expandable member card.
 *
 * Collapsed it is a name, a trade and a company — enough to scan twelve of them.
 * Expanded it gives the contact detail and the actions, in place, without
 * leaving the page.
 *
 * The header is a <button aria-expanded>, not a div: this control genuinely
 * shows and hides content, which is exactly what a disclosure button is for, and
 * it comes with keyboard and screen-reader behaviour for free.
 *
 * The expanded region is always in the DOM — collapsed via grid-template-rows,
 * not conditional rendering. That keeps the content in the server HTML for
 * search engines and for anyone whose JS never arrives, and it is what makes the
 * open/close animate at all: height:auto cannot be transitioned, 1fr→0fr can.
 */
export function MemberCard({
  member,
  teamName,
  open,
  onToggle,
}: {
  member: Member;
  teamName: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const accent = professionAccent(member.profession);
  const profession = professionLabel(member.profession);
  const wa = whatsappNumber(member);
  const profileUrl = `/civil/member/${member.slug}/`;

  /**
   * Save contact.
   *
   * The vCard is built here rather than passed from the server: it is a pure
   * string function, and building it per card on the server would put twelve
   * copies into the page payload for a button most visitors never press.
   *
   * A Blob download rather than a `data:` URL — iOS opens data: vCards as text
   * instead of handing them to Contacts. Caveat unchanged: QR scanners often
   * open pages inside the WhatsApp webview, which is the least forgiving place
   * for Blob downloads. Needs a real phone before launch.
   */
  function saveContact() {
    const siteUrl =
      typeof window !== 'undefined' ? window.location.origin : 'https://azpire.klyonix.in';
    const vcard = buildVCard(member, {
      teamName,
      chapterName: CHAPTER.name,
      profileUrl: `${siteUrl}${profileUrl}`,
    });
    const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = vCardFilename(member, CHAPTER.name);
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoking synchronously can cancel the download.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  /**
   * Share. navigator.share needs HTTPS and a real gesture, and desktop support
   * is partial — so the clipboard fallback is a normal path, not an edge case.
   * Shares the profile URL, because a link to a card cannot preview a person.
   */
  async function shareProfile() {
    const absolute = new URL(profileUrl, window.location.origin).toString();
    const text = `${member.name}, ${profession} at ${member.company}. Part of the ${CHAPTER.name} ${teamName}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${member.name}, ${profession}`, text, url: absolute });
        return;
      } catch {
        // Dismissed or rejected — fall through rather than leave the tap unanswered.
      }
    }
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link', absolute);
    }
  }

  return (
    <article
      className="member-card press"
      data-open={open || undefined}
      style={{ '--member-accent': accent } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <span className="member-avatar" aria-hidden="true">
          {initials(member)}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-label font-semibold text-ink">{member.name}</span>
          <span className="mt-1 flex items-center gap-1.5" style={{ color: accent }}>
            <CategoryIcon name={professionIcon(member.profession)} className="h-4 w-4 shrink-0" />
            <span className="truncate text-micro uppercase">{profession}</span>
          </span>
          <span className="mt-1 block truncate text-meta text-ink-400">{member.company}</span>
        </span>

        <span aria-hidden="true" className="member-chevron text-ink-300 shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Collapsed with max-height rather than conditional rendering, so the
          content stays in the server HTML for search engines and for anyone
          whose JS never arrives. See globals.css for why this is not the
          grid 0fr→1fr trick. */}
      <div id={panelId} className="member-panel">
        <div className="border-t border-hairline px-4 pb-4 pt-4">
          {/* Rendered only when the member actually wrote one. No invented copy. */}
          {member.description && (
            <p className="mb-4 text-body text-ink-700">{member.description}</p>
          )}

          {member.idealReferral && (
            <p
              className="mb-4 border-l-2 pl-3 font-display text-quote italic text-ink"
              style={{ borderColor: accent }}
            >
              &ldquo;{member.idealReferral}&rdquo;
            </p>
          )}

          <dl className="space-y-2.5 text-meta">
            {member.contact.phone && (
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Phone</dt>
                <PhoneGlyph />
                <dd>
                  <a href={telLink(member.contact.phone)} className="text-ink-700 hover:text-ink">
                    {member.contact.phone}
                  </a>
                </dd>
              </div>
            )}
            {member.contact.email && (
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Email</dt>
                <MailGlyph />
                <dd>
                  <a
                    href={`mailto:${member.contact.email}`}
                    className="truncate text-ink-700 hover:text-ink"
                  >
                    {member.contact.email}
                  </a>
                </dd>
              </div>
            )}
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Location</dt>
              <PinGlyph />
              <dd className="text-ink-500">Pollachi, Tamil Nadu</dd>
            </div>
          </dl>

          {/* Every action, in the card. Icon-only because five labelled buttons
              do not fit a phone-width card, and because these five glyphs are
              near-universal. Ordered by what we most want to happen: message,
              call, keep, pass on, read more. */}
          <div className="mt-4 flex gap-2 border-t border-hairline pt-4">
            {wa && (
              <a
                href={waLink(wa, whatsappIntro(member.preferredName, teamName))}
                aria-label={`WhatsApp ${member.name}`}
                title="WhatsApp"
                className="card-action card-action-wa"
              >
                <ChatGlyph />
              </a>
            )}
            {member.contact.phone && (
              <a
                href={telLink(member.contact.phone)}
                aria-label={`Call ${member.name}`}
                title="Call"
                className="card-action"
              >
                <PhoneGlyph solid />
              </a>
            )}
            <button
              type="button"
              onClick={saveContact}
              aria-label={`Save ${member.name} to contacts`}
              title={saved ? 'Saved' : 'Save contact'}
              className="card-action"
            >
              {saved ? <TickGlyph /> : <SaveGlyph />}
            </button>
            <button
              type="button"
              onClick={shareProfile}
              aria-label={`Share ${member.name}'s profile`}
              title={copied ? 'Link copied' : 'Share'}
              className="card-action"
            >
              {copied ? <TickGlyph /> : <ShareGlyph />}
            </button>
            {/* The profile is the shareable URL — a card cannot preview a person. */}
            <a
              href={`/civil/member/${member.slug}/`}
              aria-label={`View ${member.name}'s full profile`}
              title="View profile"
              className="card-action"
            >
              <PersonGlyph />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

const G = 'h-4 w-4 shrink-0 text-ink-300';
const glyph = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  viewBox: '0 0 24 24',
} as const;

const PhoneGlyph = ({ solid = false }: { solid?: boolean }) => (
  <svg {...glyph} className={solid ? 'h-[18px] w-[18px]' : G} aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const A = 'h-[18px] w-[18px]';
/** Download-into-tray: the standard save-contact mark. */
const SaveGlyph = () => (
  <svg {...glyph} className={A} aria-hidden="true">
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M4 20h16" />
  </svg>
);
/** Three nodes joined — the share mark on both iOS and Android. */
const ShareGlyph = () => (
  <svg {...glyph} className={A} aria-hidden="true">
    <circle cx="18" cy="5" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="18" cy="19" r="2.6" />
    <path d="m8.4 10.7 7.2-4.2M8.4 13.3l7.2 4.2" />
  </svg>
);
const PersonGlyph = () => (
  <svg {...glyph} className={A} aria-hidden="true">
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
);
/** Confirmation for save and share — the button answers the tap. */
const TickGlyph = () => (
  <svg {...glyph} className={A} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);
const MailGlyph = () => (
  <svg {...glyph} className={G} aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);
const PinGlyph = () => (
  <svg {...glyph} className={G} aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ChatGlyph = () => (
  <svg {...glyph} className="h-4 w-4 shrink-0" aria-hidden="true">
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 8.4 8.4 0 0 1-4-1L3 20l1-4a8.4 8.4 0 0 1-1-4 8.4 8.4 0 0 1 8.5-9 8.5 8.5 0 0 1 9 8.5z" />
  </svg>
);
