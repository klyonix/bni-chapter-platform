'use client';

import { useId, useState } from 'react';
import { AnimatedIcon } from '@/components/premium-card/AnimatedIcon';
import { Icon } from '@/components/ui/Icon';
import { PremiumCard } from '@/components/premium-card/PremiumCard';
import { themeFor } from '@/components/premium-card/categoryThemes';
import { CHAPTER, whatsappIntro } from '@/data/chapter';
import { professionIcon, professionLabel } from '@/data/professions';
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
  index = 0,
}: {
  member: Member;
  teamName: string;
  open: boolean;
  onToggle: () => void;
  /** Position in the grid; drives the reveal stagger. */
  index?: number;
}) {
  const panelId = useId();
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const theme = themeFor(member.profession);
  const accent = theme.accent;
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
    <PremiumCard theme={theme} index={index} open={open}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <span className="member-avatar" aria-hidden="true">
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized
            <img
              src={member.photo}
              alt=""
              // object-top: portraits are tall, full-figure cutouts; a centred
              // square crop lands on the chest, so anchor to the head.
              className="h-full w-full rounded-full object-cover object-top"
            />
          ) : (
            initials(member)
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-label font-semibold text-ink">{member.name}</span>
          <span className="mt-1 flex items-center gap-1.5" style={{ color: accent }}>
            <AnimatedIcon
              name={professionIcon(member.profession)}
              motion={theme.iconMotion}
              className="h-4 w-4 shrink-0"
            />
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
                <Icon name="phone" className="text-ink-300 h-4 w-4 shrink-0" />
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
                <Icon name="mail" className="text-ink-300 h-4 w-4 shrink-0" />
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
              <Icon name="location" className="text-ink-300 h-4 w-4 shrink-0" />
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
                <Icon name="whatsapp" className="h-[18px] w-[18px] shrink-0" />
              </a>
            )}
            {member.contact.phone && (
              <a
                href={telLink(member.contact.phone)}
                aria-label={`Call ${member.name}`}
                title="Call"
                className="card-action"
              >
                <Icon name="phone" className="h-[18px] w-[18px]" />
              </a>
            )}
            <button
              type="button"
              onClick={saveContact}
              aria-label={`Save ${member.name} to contacts`}
              title={saved ? 'Saved' : 'Save contact'}
              className="card-action"
            >
              {saved ? (
                <Icon name="check" className="h-[18px] w-[18px]" />
              ) : (
                <Icon name="save-contact" className="h-[18px] w-[18px]" />
              )}
            </button>
            <button
              type="button"
              onClick={shareProfile}
              aria-label={`Share ${member.name}'s profile`}
              title={copied ? 'Link copied' : 'Share'}
              className="card-action"
            >
              {copied ? (
                <Icon name="check" className="h-[18px] w-[18px]" />
              ) : (
                <Icon name="share" className="h-[18px] w-[18px]" />
              )}
            </button>
            {/* The profile is the shareable URL — a card cannot preview a person. */}
            <a
              href={`/civil/member/${member.slug}/`}
              aria-label={`View ${member.name}'s full profile`}
              title="View profile"
              className="card-action"
            >
              <Icon name="person" className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </PremiumCard>
  );
}
