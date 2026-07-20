import type { ProfessionSlug } from '@/data/professions';

/**
 * Theme families — the single source of truth for card accent, pattern and motion.
 *
 * ── Why families, not one colour per trade ───────────────────────────────────
 *
 * There are twelve trades. Giving each its own hue produces a rainbow, which is
 * the opposite of the restraint this design is after. Grouping them into five
 * families that share a palette reads as a system rather than a set of stickers.
 *
 * The cost is real and worth naming: Tiles and Hardware are both "structural",
 * so they are now the same blue, and colour alone no longer tells you a member's
 * exact trade. That signal does not disappear — it moves. **Family carries the
 * colour; the trade keeps its own glyph** (see CategoryIcon). Colour tells you
 * the kind of work, the icon and the label tell you the trade.
 *
 * ── On the values ────────────────────────────────────────────────────────────
 *
 * `accent` is used as small uppercase label text, so it is measured, not picked:
 * every one is AA on the white card (5.1:1 – 8.3:1), AA with white on top as a
 * fill, and AA against its own `accentSoft` as a badge pill. Re-measure if any
 * of them change.
 *
 * `accentSoft` is a tint for fills only. It is not a text colour.
 */
export type ThemeFamily = 'construction' | 'structural' | 'interior' | 'systems' | 'land';

/** Which decorative SVG sits behind the card at ~0.04 opacity. */
export type PatternName = 'concrete' | 'nodes' | 'weave' | 'circuit' | 'plot';

/** How the trade glyph idles. Transform-only, 6–8s, near-imperceptible. */
export type IconMotion = 'float' | 'pulse' | 'rotate';

export interface CategoryTheme {
  family: ThemeFamily;
  /** AA as label text on white. */
  accent: string;
  /** Tint for fills. Never text. */
  accentSoft: string;
  pattern: PatternName;
  iconMotion: IconMotion;
  /** Very low opacity wash. Two stops only — a multi-stop ramp reads as SaaS. */
  gradient: string;
}

const THEMES: Record<ThemeFamily, CategoryTheme> = {
  // Site work: the people who pour and build the thing.
  construction: {
    family: 'construction',
    accent: '#C2410C',
    accentSoft: '#FFF1E7',
    pattern: 'concrete',
    iconMotion: 'pulse',
    gradient: 'linear-gradient(135deg, #C2410C 0%, transparent 62%)',
  },
  // What the building is made of and closed with.
  structural: {
    family: 'structural',
    accent: '#1E4E8C',
    accentSoft: '#E9F0F9',
    pattern: 'nodes',
    iconMotion: 'float',
    gradient: 'linear-gradient(135deg, #1E4E8C 0%, transparent 62%)',
  },
  // The finish: what the client actually sees and touches.
  interior: {
    family: 'interior',
    accent: '#96631A',
    accentSoft: '#FBF3E4',
    pattern: 'weave',
    iconMotion: 'float',
    gradient: 'linear-gradient(135deg, #96631A 0%, transparent 62%)',
  },
  // Things that flow through the building.
  systems: {
    family: 'systems',
    accent: '#0369A1',
    accentSoft: '#E6F3FA',
    pattern: 'circuit',
    iconMotion: 'pulse',
    gradient: 'linear-gradient(135deg, #0369A1 0%, transparent 62%)',
  },
  // The land and the paperwork, before anything is built.
  land: {
    family: 'land',
    accent: '#047857',
    accentSoft: '#E6F5EF',
    pattern: 'plot',
    iconMotion: 'rotate',
    gradient: 'linear-gradient(135deg, #047857 0%, transparent 62%)',
  },
};

/**
 * Every trade in src/data/professions.ts maps here. The Record is exhaustive by
 * type, so adding a profession without giving it a family is a compile error
 * rather than a member who silently renders grey.
 */
const FAMILY_BY_PROFESSION: Record<ProfessionSlug, ThemeFamily> = {
  builder: 'construction',
  'building-materials': 'construction',
  'cement-concrete': 'construction',

  tiles: 'structural',
  architecture: 'structural',
  hardware: 'structural',
  'windows-doors': 'structural',

  'interior-decorator': 'interior',
  'curtains-nets': 'interior',
  'false-ceiling': 'interior',
  painter: 'interior',

  'water-systems': 'systems',

  'land-promoter': 'land',
  approvals: 'land',
};

export function themeFor(profession: ProfessionSlug): CategoryTheme {
  return THEMES[FAMILY_BY_PROFESSION[profession]];
}

export function themeByFamily(family: ThemeFamily): CategoryTheme {
  return THEMES[family];
}
