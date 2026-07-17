# Motion: what happened, and why animation is CSS

Short version: **Motion (motion.dev) was tried, failed, and has been removed.**
Animation on this site is CSS. This is a deliberate decision after the JS route
was tried, measured and found broken. Read this before reaching for it again.

## What was tried

LazyMotion with `m` components, exactly as documented:

```tsx
<LazyMotion features={loadFeatures} strict>
  {' '}
  // and features={domMax}
  <MotionConfig reducedMotion="user">…</MotionConfig>
</LazyMotion>
```

Versions: `motion@12.42.2`, Next 15.3.3, React 19.1.0, static export.

## What went wrong

**Under LazyMotion, Motion's animation loop does not run in this stack.** Static
values are applied and then never animated away. Three distinct symptoms, all
reproduced against a **production build** served statically (not a dev-server
artefact):

| Setup                             | Symptom                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AnimatePresence` + `m.li`        | Exiting children never finish their exit, so they never unmount. Ten cards stayed in the DOM and **the profession filter silently stopped filtering**. |
| `m.li` with `initial` / `animate` | `initial` applied (it is just a style), `animate` never ran. Newly filtered-in cards were **stranded at `opacity: 0`** — permanently invisible.        |
| `m.li` with `layout` only         | Layout projection applied `translate3d(0, 1958px, 0)` and never animated back. Cards **displaced off-screen**.                                         |

Async (`features={() => import(…)}`) and synchronous (`features={domMax}`) both
failed. The lazily-imported chunk was confirmed to load. Removing LazyMotion and
using full `motion` **did** work — verified by sampling frames mid-transition
(`translateY` 8 → 7.46 → 6.93 → 5.54 → 2.83 → 1.51 → none).

So the choice was: full `motion`, or no Motion.

## Why CSS won

Full `motion` costs **+26 kB** on `/civil` (149 kB vs 123 kB) — the QR landing
page, the one screen where a visitor is standing at an event on 4G. Everything it
was buying us is available in CSS for **zero bytes**:

- **Arrival** — `.rise` keyframes with a stagger (`globals.css`).
- **Press feedback** — `.press:active { transform: scale(.975) }`.
- **Filter** — the work is a synchronous array filter over data already in the
  HTML. There is nothing to animate _through_; the chip state and the instant
  result are the honest feedback.

CSS also fixes a problem Motion introduced. Motion renders `initial={{opacity:0}}`
into the **server HTML**, so a visitor whose JS is slow or blocked sees a blank
page. CSS animation needs no JS. The shipped HTML contains **zero** `opacity:0`
styles — the site is fully readable with JavaScript disabled.

And `prefers-reduced-motion` is handled once, in `globals.css`, for everything.
Motion needed a separate `reducedMotion="user"` because JS animation sails past
CSS media queries entirely.

## If you want to revisit

`motion` has been removed from `package.json`. The site's runtime dependencies are
now just `next`, `react` and `react-dom`. Before adding it back:

1. Reproduce the three failures above on the current version — they may be fixed.
2. Test against `next build` plus a static server, **never** the dev server. HMR
   both masked real failures and invented fake ones while this was being debugged,
   and cost hours. A production build found the true cause in minutes.
3. Check the shipped HTML for `opacity:0` before shipping. Motion writes `initial`
   into the server HTML; anything hidden there is invisible without JS.
4. Re-measure `/civil` First Load JS. Budget is ~115 kB against a 101 kB Next +
   React floor. It is currently 107 kB.

Bring it back only for something CSS genuinely cannot do — shared-element
transitions, drag, gesture-driven physics. Fades, slides, staggers and press
states are not that.
