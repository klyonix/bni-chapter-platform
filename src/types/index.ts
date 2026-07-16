/**
 * Core domain type placeholders for the power team portfolio.
 *
 * These interfaces describe the future data model so components, data
 * loaders, and routes can be typed consistently as features land. They
 * are intentionally minimal — extend them when building real features.
 * No feature logic should live here.
 *
 * Scope: a single BNI chapter. Power teams and their members —
 * no chapter-management model.
 */

export interface PowerTeam {
  slug: string; // e.g. "civil", "manufacturing", "healthcare", "finance"
  name: string;
}

export interface Member {
  slug: string;
  name: string;
  powerTeamSlug: string;
}
