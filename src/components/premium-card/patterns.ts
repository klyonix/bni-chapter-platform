import type { PatternName } from '@/components/premium-card/categoryThemes';

/**
 * Decorative card patterns, one per theme family.
 *
 * Inline SVG data URIs: no image request, no licence, a few hundred bytes each,
 * and they tile. They sit at ~0.04 opacity behind the card content, clipped to
 * the radius and pointer-events:none — texture, not illustration. At that weight
 * you should feel them, not read them.
 *
 * Each refers to its family's actual work rather than being generic decoration:
 * aggregate for concrete, a node lattice for structure, a weave for interiors, a
 * trace for systems, a survey grid for land.
 *
 * `%23` is an encoded `#`, which is required inside a CSS url().
 */
const S = (svg: string) => `url("data:image/svg+xml,${svg}")`;

export const PATTERNS: Record<PatternName, string> = {
  // Concrete: aggregate scattered in a slab.
  concrete: S(
    "%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Ccircle cx='16' cy='18' r='5'/%3E%3Ccircle cx='58' cy='30' r='7'/%3E%3Ccircle cx='34' cy='56' r='4'/%3E%3Ccircle cx='68' cy='66' r='5'/%3E%3Ccircle cx='8' cy='62' r='3'/%3E%3Ccircle cx='44' cy='12' r='3'/%3E%3C/g%3E%3C/svg%3E",
  ),
  // Structure: a node lattice — a truss seen from the front.
  nodes: S(
    "%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Cpath d='M0 36h72M36 0v72M0 0l72 72M72 0L0 72'/%3E%3Ccircle cx='36' cy='36' r='3.5' fill='%23000'/%3E%3Ccircle cx='0' cy='0' r='2.5' fill='%23000'/%3E%3Ccircle cx='72' cy='72' r='2.5' fill='%23000'/%3E%3Ccircle cx='72' cy='0' r='2.5' fill='%23000'/%3E%3Ccircle cx='0' cy='72' r='2.5' fill='%23000'/%3E%3C/g%3E%3C/svg%3E",
  ),
  // Interior: a woven texture — fabric, matting, finish.
  weave: S(
    "%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Cpath d='M0 10h40M0 30h40M10 0v40M30 0v40'/%3E%3Cpath d='M0 0l10 10M30 30l10 10M40 0L30 10M10 30L0 40'/%3E%3C/g%3E%3C/svg%3E",
  ),
  // Systems: a trace — pipework or circuitry routed round corners.
  circuit: S(
    "%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='84'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Cpath d='M6 6h30v30h30v30h12'/%3E%3Cpath d='M6 78V54h24V24h30V6'/%3E%3Ccircle cx='36' cy='36' r='3'/%3E%3Ccircle cx='66' cy='66' r='3'/%3E%3Ccircle cx='30' cy='54' r='3'/%3E%3C/g%3E%3C/svg%3E",
  ),
  // Land: a survey grid with plot divisions.
  plot: S(
    "%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Cpath d='M0 0h64v64H0z'/%3E%3Cpath d='M0 32h64M32 0v64'/%3E%3Cpath d='M0 0l16 16M64 64L48 48' stroke-dasharray='2 3'/%3E%3C/g%3E%3C/svg%3E",
  ),
};
