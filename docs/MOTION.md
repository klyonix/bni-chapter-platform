# Motion: how animation works here, and one expensive wrong turn

Animation is split deliberately:

- **CSS** for anything above the fold, and for press feedback.
- **Framer Motion**, behind `LazyMotion` + `m`, for scroll-linked and
  scroll-triggered motion — the things CSS cannot do well.

Read the rule in §2 before adding either.

## 1. The wrong turn, recorded so nobody repeats it

This file previously stated that **LazyMotion was broken in this stack** and that
Framer had been removed because of it. **That was wrong**, and the retraction
matters more than the original claim.

The evidence looked damning: animations frozen mid-flight, `opacity` stuck at
`0.746814` forever; an inline `max-height: 40rem` computing to `0px`; a
`grid-template-rows: 1fr` resolving to `0px`. Three different techniques, all
apparently dead.

The actual cause was a **backgrounded browser tab**. Browsers pause
`requestAnimationFrame` when `document.hidden` is true, so nothing driven by a
MotionValue — or by any CSS transition — advances. Every reading was of a paused
frame.

The same false signal later "broke" the expandable member card, which was also
fine the whole time. Both cost hours.

> **The rule: verify animation with a screenshot, never by reading computed style
> from a headless tab.** A screenshot forces the tab visible; `getComputedStyle`
> does not. If something looks frozen, check `document.hidden` first.

LazyMotion is now in use and demonstrably works — verified by screenshot, with
the stat counters caught mid-count and settling at their real value.

## 2. The rule that is real: never hide content above the fold

Framer renders `initial` into the **server HTML**. So `initial="hidden"` ships
`style="opacity:0"` in the markup, and a visitor whose JS is blocked — or merely
slow, on 4G, having scanned a QR code on a water bottle — sees **nothing**.

This was live on `/civil`, the QR landing page: the eyebrow, the `h1`, the
description and the CTA all shipped invisible. The stat counters were worse —
they shipped `0`, so the page claimed the chapter had **0 members**. Not a
missing number, a wrong one.

So:

| Where              | What to use                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| Above the fold     | CSS `.rise` / `.rise-1..3` (globals.css). No JS, no bytes, reduced-motion already handled.            |
| Below the fold     | `RevealAnimation` / `useReveal`.                                                                      |
| Scroll-linked fade | `useScrollFade` — it only ever fades **already-visible** content, so nothing can get stuck behind it. |
| Press feedback     | CSS `:active`. Instant, free, cannot strand an element.                                               |

`<noscript>` guards in `app/layout.tsx` cover JS-off for `[data-reveal]` and
`[data-counter]`. They do **not** cover slow-JS — which is exactly why the table
above exists rather than relying on the guard.

## 3. Bundle

`LazyMotion features={domAnimation}` (~15kb), not `domMax` (~25kb): nothing uses
`layout` or drag. **If you add a `layout` animation this must change** — check
first.

`strict` is on. It throws if a full `motion` component renders anywhere inside,
because one `motion.div` silently pulls the whole bundle back and undoes the
split. Use `m` from `framer-motion`.

Measured effect of the switch:

| Route                  | Full `motion` | `LazyMotion` + `m` |
| ---------------------- | ------------- | ------------------ |
| `/civil`               | 165 kB        | **150 kB**         |
| `/civil/member/[slug]` | 149 kB        | **122 kB**         |

Framer's docs also suggest loading features asynchronously to split further.
That was tried and appeared to fail — but it was tested under the frozen-tab
conditions above, so **that result is not trustworthy either**. Worth revisiting
with a visible tab and a real measurement.

## 4. Performance rules

- Animate **`transform` and `opacity` only**. No width/height/top/left, no
  filter, and never a continuously-animated `box-shadow` — swap between the
  shadow tokens on state change instead.
- The border beam is a rotating conic layer, not an animated `border-color`, for
  exactly this reason.
- Nothing carries a permanent `will-change`.
- Every loop, reveal and idle is behind `useReducedMotion()`, plus the global
  `prefers-reduced-motion` block in globals.css.
