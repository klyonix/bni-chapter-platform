# Architecture Notes

This document captures the intended structure so future features slot in cleanly.
No features are implemented yet — this is scaffold only.

## Directory responsibilities

| Path             | Purpose                                                      |
| ---------------- | ------------------------------------------------------------ |
| `src/app`        | App Router routes, layouts, and route-level metadata.        |
| `src/components` | Reusable, presentational UI components.                      |
| `src/layouts`    | Page/section layout wrappers shared across routes.           |
| `src/lib`        | Framework-agnostic business logic and data access helpers.   |
| `src/hooks`      | Reusable React hooks.                                        |
| `src/data`       | Static/seed data and content sources (e.g. chapter configs). |
| `src/types`      | Shared TypeScript types and domain models.                   |
| `src/styles`     | Global styles and Tailwind entry (`globals.css`).            |
| `src/utils`      | Small pure utility functions.                                |
| `public/images`  | Open Graph images, banners, general imagery.                 |
| `public/icons`   | Icon assets.                                                 |
| `public/members` | Member profile images / assets for future member pages.      |

## Scope

This is a **power team portfolio for a single BNI chapter**. It is not a
multi-chapter platform and does not manage BNI chapters.

## Planned URL architecture

The codebase serves the power teams of the chapter and their members:

```
/                       Home (chapter power teams)
/civil                  Power team: Civil          [QR landing — the real front door]
/manufacturing          Power team: Manufacturing  [future]
/healthcare             Power team: Healthcare     [future]
/finance                Power team: Finance        [future]
/civil/member/[slug]    Individual member profile
```

Member profiles are **team-scoped** (`/civil/member/hitesh-kumar`), not flat
(`/member/hitesh-kumar`). The URL carries context, so a link pasted into WhatsApp
reads as a Civil Power Team member and back navigation is unambiguous. The
trade-off accepted: if a member changes power team their URL changes. Slugs are
globally unique (enforced by `scripts/validate-data.ts`), so a redirect stub is
cheap if that ever happens.

Power teams are data-driven: `src/data/teams.ts` plus a member array registered in
`src/lib/members.ts`. Adding a team is data, not routes — `generateStaticParams`
reads teams with `status: 'live'`.

## Future feature areas (not yet built)

Power team pages, member profiles, QR landing pages, referral tracking, visitor
registration, and analytics. Keep modules decoupled so these can be added
incrementally.

## Static export constraints

The site is exported statically (`output: 'export'`). Dynamic routes such as
`/member/[slug]` will require `generateStaticParams` to pre-render each path at
build time. There is no server runtime — avoid server actions, route handlers,
or on-demand rendering. Client-side data fetching against external APIs is fine.
