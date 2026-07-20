'use client';

import { useState } from 'react';
import { MemberCard } from '@/components/team/MemberCard';
import type { Member } from '@/types';

/**
 * The member grid: accordion state only.
 *
 * Order is FIXED — it follows the chapter's official roster order defined in
 * data/members/civil.ts (the BNI Azpire 14.0 sequence), so it is deliberately
 * not shuffled. `index` still drives the per-card reveal stagger.
 *
 * Accordion: opening one card closes the other. With twelve cards, letting them
 * all sit open turns the page into a wall and loses the scan.
 */
export function MemberGrid({ members, teamName }: { members: Member[]; teamName: string }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <ul className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, i) => (
        <li key={member.slug}>
          <MemberCard
            index={i}
            member={member}
            teamName={teamName}
            open={openSlug === member.slug}
            onToggle={() => setOpenSlug((cur) => (cur === member.slug ? null : member.slug))}
          />
        </li>
      ))}
    </ul>
  );
}
