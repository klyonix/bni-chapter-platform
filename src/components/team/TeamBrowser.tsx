'use client';

import { useState } from 'react';
import { Chip } from '@/components/primitives/Chip';
import { MemberCard } from '@/components/team/MemberCard';
import type { ProfessionSlug } from '@/data/professions';
import type { Member } from '@/types';

/**
 * Chips plus the member list.
 *
 * One client component rather than a filter and a list with state lifted
 * between them — the state is a single string and splitting it buys nothing.
 *
 * Filtering is a synchronous array filter over data already in the HTML, so
 * there is no loading state and nothing to await. No search box: twelve members
 * do not justify asking someone standing at an event to type on a phone.
 */
type Filter = ProfessionSlug | 'all';

export function TeamBrowser({
  members,
  professions,
  teamName,
}: {
  members: Member[];
  professions: Array<{ slug: ProfessionSlug; label: string; count: number }>;
  teamName: string;
}) {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'all' ? members : members.filter((m) => m.profession === filter);

  return (
    <>
      {/* Sticky so the filter stays reachable once the list is moving. Chips
          are generated from professions that actually have members, which is
          why an empty result is unreachable. */}
      {/* Solid, not translucent. A blurred bar is decoration the brief rules out,
          and text sliding under frosted glass is harder to read, not easier. */}
      <div className="sticky top-0 z-20 -mx-5 border-b border-hairline bg-paper px-5 py-3">
        {/* Phone: one scrolling row, bleeding to the screen edge so it reads as
            scrollable. Wider: no room problem, so they wrap and align to the
            cards. Scrolling chips on a desktop is just a clipped list. */}
        <div
          role="group"
          aria-label="Filter by profession"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
            All {members.length}
          </Chip>
          {professions.map((p) => (
            <Chip key={p.slug} active={filter === p.slug} onClick={() => setFilter(p.slug)}>
              {p.label}
            </Chip>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {visible.map((member) => (
          <li key={member.slug}>
            <MemberCard member={member} teamName={teamName} />
          </li>
        ))}
      </ul>
    </>
  );
}
