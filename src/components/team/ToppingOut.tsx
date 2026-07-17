/**
 * The footer band on /civil: a topping-out.
 *
 * Topping out is the ceremony when the last beam goes onto a finished frame, and
 * the tradition is to fix an evergreen to that beam before it lands. Which is
 * the line it sits under, drawn: the frame is "together we build", the tree
 * riding the beam is "together we grow". The animation this replaces was a
 * tractor hauling fruit, under a tagline about building, on a page of builders
 * and tilers and cement suppliers.
 *
 * Hand-drawn rather than sourced: about 2 kB of markup against the 24 kB .lottie
 * it replaces, no runtime, no third party, and no licence to get wrong on a page
 * that carries twelve members' real phone numbers. Same 1.5 line weight and
 * blueprint blue as the rest of the drawing language here — line-work reads as a
 * drawing, which is what a civil team actually produces, where an illustration
 * would read as clip-art and fight the serif.
 */
export function ToppingOut() {
  return (
    <div className="topout" aria-hidden="true">
      <svg viewBox="0 0 1200 340" className="h-full w-full">
        {/* stroke="currentColor" is load-bearing. Without it the paths default to
            stroke:none and the whole band renders invisibly, which looks exactly
            like the component never mounted. Learned once already. */}
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path className="topout-draw" d="M0 320h1200" strokeWidth="1.5" />

          {/* A quieter tower, far off. Depth without detail. */}
          <g className="topout-draw" strokeWidth="1.2">
            <path d="M120 320V190h130v130" />
            <path d="M120 235h130M120 275h130M185 190v130" />
          </g>

          {/* The finished frame, waiting for its last beam. */}
          <g className="topout-draw" strokeWidth="1.5">
            <path d="M430 320V150M520 320V150M610 320V150M700 320V150" />
            <path d="M430 260h270M430 205h270M430 150h270" />
          </g>

          {/* The crane. Mast draws in; everything hanging off it sways. */}
          <g strokeWidth="1.5">
            <g className="topout-draw">
              <path d="M880 320V40" />
              <path d="M862 320h36M872 280h16M872 220h16M872 160h16M872 100h16" />
            </g>

            <g className="topout-jib">
              <path d="M545 40h465" />
              <path d="M880 40V8M880 8L560 36M880 8L1000 36" />
              {/* Counterweight, over the short arm. */}
              <path d="M975 40v26h34v-26" />

              {/* Hoist line, the final beam, and the evergreen riding it in.
                  The beam hangs 20 above the frame's top floor: close enough to
                  read as about to land, not as already landed.

                  The tree is drawn far larger than looks right in the viewBox,
                  because the band is 1200 wide inside a 390px phone. At the size
                  that felt correct here it came out around 12px on the device and
                  read as a smudge — and the tree is the entire "grow" half of the
                  line above it. Judge it at 375, not at 1200. */}
              <path d="M520 40v90" />
              <path d="M430 130h270" />
              <g strokeWidth="1.5">
                <path d="M640 130v-10" />
                <path d="M618 120L640 98L662 120" />
                <path d="M622 104L640 84L658 104" />
                <path d="M626 88L640 60L654 88" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
