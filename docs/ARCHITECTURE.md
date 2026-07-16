# Architecture Notes

This document captures the intended structure so future features slot in cleanly.
No features are implemented yet — this is scaffold only.

## Directory responsibilities

| Path              | Purpose                                                        |
| ----------------- | -------------------------------------------------------------- |
| `src/app`         | App Router routes, layouts, and route-level metadata.          |
| `src/components`  | Reusable, presentational UI components.                        |
| `src/layouts`     | Page/section layout wrappers shared across routes.             |
| `src/lib`         | Framework-agnostic business logic and data access helpers.     |
| `src/hooks`       | Reusable React hooks.                                          |
| `src/data`        | Static/seed data and content sources (e.g. chapter configs).   |
| `src/types`       | Shared TypeScript types and domain models.                     |
| `src/styles`      | Global styles and Tailwind entry (`globals.css`).              |
| `src/utils`       | Small pure utility functions.                                  |
| `public/images`   | Open Graph images, banners, general imagery.                   |
| `public/icons`    | Icon assets.                                                   |
| `public/members`  | Member profile images / assets for future member pages.        |

## Scope

This is a **power team portfolio for BNI Azpire, Greater Coimbatore** — a single
chapter. It is not a multi-chapter platform and does not manage BNI chapters.

## Planned URL architecture

The codebase serves the power teams of BNI Azpire and their members:

```
/                     Home (BNI Azpire power teams)
/civil                Power team: Civil
/manufacturing        Power team: Manufacturing
/healthcare           Power team: Healthcare
/finance              Power team: Finance
/member/[slug]        Individual member profile
```

Power teams are intended to be data-driven (see `src/types` and future
`src/data`), so adding a new team should mean adding data, not new routes.

## Future feature areas (not yet built)

Power team pages, member profiles, QR landing pages, referral tracking, visitor
registration, and analytics. Keep modules decoupled so these can be added
incrementally.

## Static export constraints

The site is exported statically (`output: 'export'`). Dynamic routes such as
`/member/[slug]` will require `generateStaticParams` to pre-render each path at
build time. There is no server runtime — avoid server actions, route handlers,
or on-demand rendering. Client-side data fetching against external APIs is fine.
