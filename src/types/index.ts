/**
 * Core domain type placeholders.
 *
 * These interfaces describe the future data model so components, data
 * loaders, and routes can be typed consistently as features land. They
 * are intentionally minimal — extend them when building real features.
 * No feature logic should live here.
 */

export interface Chapter {
  slug: string;
  name: string;
}

export interface PowerTeam {
  slug: string; // e.g. "civil", "manufacturing", "healthcare", "finance"
  name: string;
  chapterSlug: string;
}

export interface Member {
  slug: string;
  name: string;
  powerTeamSlug: string;
}
