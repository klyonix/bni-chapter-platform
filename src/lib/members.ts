import { civilMembers } from '@/data/members/civil';
import { PROFESSIONS, type ProfessionSlug } from '@/data/professions';
import { TEAMS } from '@/data/teams';
import type { Member, PowerTeam, PowerTeamSlug } from '@/types';

/**
 * Data access for teams and members.
 *
 * Framework-agnostic on purpose: no React, no Next, no fs. When a backend
 * arrives, this file changes and nothing else does (plan §16).
 *
 * Adding a power team means adding its member array to MEMBERS_BY_TEAM and
 * flipping its status in src/data/teams.ts. No route work.
 */
const MEMBERS_BY_TEAM: Partial<Record<PowerTeamSlug, Member[]>> = {
  civil: civilMembers,
};

const ALL_MEMBERS: Member[] = Object.values(MEMBERS_BY_TEAM).flat();

/**
 * Members with an explicit `order` sort first and by that order; the rest fall
 * back to alphabetical. Stable, and never dependent on file position.
 */
function byOrderThenName(a: Member, b: Member): number {
  const ao = a.order ?? Number.MAX_SAFE_INTEGER;
  const bo = b.order ?? Number.MAX_SAFE_INTEGER;
  if (ao !== bo) return ao - bo;
  return a.name.localeCompare(b.name);
}

export function getTeams(): PowerTeam[] {
  return TEAMS;
}

/** Only these get routes and links. `generateStaticParams` reads this. */
export function getLiveTeams(): PowerTeam[] {
  return TEAMS.filter((t) => t.status === 'live');
}

export function getTeamBySlug(slug: string): PowerTeam | undefined {
  return TEAMS.find((t) => t.slug === slug);
}

export function getMembersByTeam(team: PowerTeamSlug): Member[] {
  return [...(MEMBERS_BY_TEAM[team] ?? [])].sort(byOrderThenName);
}

/** A member is only valid at a team URL they actually belong to. */
export function getMemberInTeam(team: PowerTeamSlug, slug: string): Member | undefined {
  const member = ALL_MEMBERS.find((m) => m.slug === slug);
  return member?.powerTeams.includes(team) ? member : undefined;
}

/**
 * Professions actually present in a team, in registry order.
 *
 * Derived, never hand-listed: a chip can only exist if a member sits behind it,
 * which is why the empty-filter state is unreachable (plan §13).
 */
export function getProfessionsForTeam(
  team: PowerTeamSlug,
): Array<{ slug: ProfessionSlug; label: string; count: number }> {
  const members = getMembersByTeam(team);
  return PROFESSIONS.map((p) => ({
    slug: p.slug as ProfessionSlug,
    label: p.label,
    count: members.filter((m) => m.profession === p.slug).length,
  })).filter((p) => p.count > 0);
}

/** WhatsApp falls back to the voice number when no separate one is given. */
export function whatsappNumber(member: Member): string | undefined {
  return member.contact.whatsapp ?? member.contact.phone;
}

/** Initials for the portrait fallback. Two characters at most. */
export function initials(member: Member): string {
  const parts = member.name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
