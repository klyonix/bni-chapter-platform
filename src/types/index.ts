/**
 * Domain model. One chapter, its power teams, and their members.
 */
import type { ProfessionSlug } from '@/data/professions';

export type PowerTeamSlug = 'civil' | 'manufacturing' | 'healthcare' | 'finance';

export interface PowerTeam {
  slug: PowerTeamSlug;
  /** "Civil" — the word before "Power Team", not the whole phrase. */
  name: string;
  /** The two lines a QR visitor reads first. Written for a stranger. */
  tagline: string;
  /** Only 'live' teams get routed and linked. */
  status: 'live' | 'coming-soon';
  seo: { title: string; description: string };
}

export interface MemberContact {
  /** E.164 (+919876543210). Optional: a member may publish WhatsApp only. */
  phone?: string;
  /** E.164. Falls back to `phone` when absent. */
  whatsapp?: string;
  email?: string;
  website?: string;
  /** A verified Maps URL, stored not constructed. A wrong pin beats no pin. */
  mapsUrl?: string;
}

export interface Member {
  /** Globally unique, kebab-case. Used in the URL. */
  slug: string;
  name: string;
  /**
   * What this person is called: "Hitesh". Feeds the WhatsApp greeting.
   * Never derive it — splitting "R. Hitesh" on a space greets them as "Hi R.".
   */
  preferredName: string;
  profession: ProfessionSlug;
  company: string;
  /** Shown on the profile, never on the card. */
  companyLogo?: string;
  /** Optional while the shoot is pending. Absent renders initials. */
  photo?: string;
  /** Array from the start: a member in two teams later costs no migration. */
  powerTeams: PowerTeamSlug[];
  /** ~240 chars. Three or four lines on a phone. */
  description: string;
  /** 3 to 6 items. A plain list, not chips. */
  services: string[];
  /**
   * ~200 chars. The point of the product: the only field that serves the
   * referral partner. Completes "Refer me when you hear...".
   */
  idealReferral: string;
  contact: MemberContact;
  social?: { linkedin?: string; instagram?: string; facebook?: string };
  /** Manual sort override. Members without one sort last. */
  order?: number;
}
