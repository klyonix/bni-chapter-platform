/**
 * A slow accent beam travelling the card's border.
 *
 * ── How, and why this way ────────────────────────────────────────────────────
 *
 * A conic gradient painted on a square layer, rotated by `transform`, sitting
 * behind the card body. The body is inset by 1px, so only that 1px rim of the
 * rotating layer is ever visible — the beam is the bright arc of the cone
 * sweeping past. Nothing but `rotate` changes, so the compositor owns it and it
 * cannot cost a frame.
 *
 * The obvious alternative — animating `border-color`, or a moving
 * `background-position` — repaints the element on every frame. That is exactly
 * what the brief rules out, and it is what makes cheap "glowing border" effects
 * jank a phone.
 *
 * The layer must be square and larger than the card (`aspect-square`, 140%),
 * otherwise the cone's centre is off-card and the sweep reads as a wobble rather
 * than a rotation.
 *
 * It is decoration, so it is `aria-hidden`, and `prefers-reduced-motion` stops
 * it dead via the global rule in globals.css.
 */
export function AnimatedBorder({ accent }: { accent: string }) {
  return (
    // The clip is why this is two elements, not one. The card itself cannot be
    // overflow:hidden — it holds a panel that expands, and hiding overflow clips
    // that permanently shut. So the beam gets its own clipping box: absolutely
    // positioned to the card's bounds, hidden overflow, sitting behind the body.
    // The panel lives outside it and expands freely.
    //
    // Without this the 140% cone spills well past the card and paints a huge arc
    // across the page.
    <span aria-hidden="true" className="card-beam-clip">
      <span
        className="card-beam"
        style={
          {
            // Two stops of accent in an otherwise transparent cone: one bright
            // arc, not a rainbow ring.
            '--beam': accent,
          } as React.CSSProperties
        }
      />
    </span>
  );
}
