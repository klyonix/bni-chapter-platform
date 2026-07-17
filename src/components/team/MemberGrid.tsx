'use client';

import { useEffect, useState } from 'react';
import { MemberCard } from '@/components/team/MemberCard';
import type { Member } from '@/types';

/**
 * The member grid: expansion state and the per-visit shuffle.
 *
 * ── On the shuffle ────────────────────────────────────────────────────────────
 * The goal is fair visibility: whoever sits last shouldn't always be last. But
 * this site is statically exported, so the HTML is generated once at build. A
 * random order cannot come from the server — every visitor would get the same
 * "random" order until the next deploy, and randomising during render would
 * produce a hydration mismatch (server HTML and client disagreeing), which React
 * resolves by throwing the markup away.
 *
 * So: the server emits a fixed, canonical order, and the client reorders after
 * mount using CSS `order`. Nothing moves in the DOM — only the visual position —
 * which keeps it cheap and keeps screen-reader/tab order stable and predictable.
 *
 * Two consequences worth knowing:
 *   - Without JS, everyone still sees all twelve, in file order. Fair enough.
 *   - The reorder lands in the same frame as hydration, and the cards fade in
 *     over it, so it reads as the deal-in rather than a jump.
 */
export function MemberGrid({ members, teamName }: { members: Member[]; teamName: string }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [order, setOrder] = useState<number[] | null>(null);

  useEffect(() => {
    // Fisher-Yates. Runs once per page load, which is what "shuffle on each
    // refresh" means for a static site.
    const next = members.map((_, i) => i);
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    setOrder(next);
  }, [members]);

  return (
    <ul className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, i) => (
        <li
          key={member.slug}
          // Before the effect runs (and forever, without JS) this is undefined,
          // so the grid keeps its natural source order.
          style={order ? { order: order[i] } : undefined}
        >
          <MemberCard
            index={i}
            member={member}
            teamName={teamName}
            open={openSlug === member.slug}
            // Accordion: opening one closes the other. With twelve cards, letting
            // them all sit open turns the page into a wall and loses the scan.
            onToggle={() => setOpenSlug((cur) => (cur === member.slug ? null : member.slug))}
          />
        </li>
      ))}
    </ul>
  );
}
