/**
 * The home hero landscape: the climb from the Pollachi plain into the Ghats.
 *
 * Not a picture of Pollachi — a drawing of its geography, in the same engraved
 * line-work the rest of the site speaks. Standing on the plain (heavy ink palms,
 * foreground) and looking up at the Western Ghats escarpment (pale blue
 * ridgelines, receding), with the Aliyar reservoir at its foot and the Valparai
 * ghat road switchbacking up into the hills. The road is the point: forty
 * hairpins is the truest, least-postcard image of this place, and as a stroke it
 * reads as ascent — which is the chapter's whole story.
 *
 * Colour grading is aerial perspective and nothing else: near is ink, far
 * dissolves to blueprint blue. No gradient sky, no saturation, no filter. That
 * is what keeps it an editorial drawing and not a tourism banner.
 *
 * stroke="currentColor" carries the ink; the blue layers set their own stroke.
 * Without a stroke on a group the paths default to stroke:none and the whole
 * band renders invisibly — a mistake this project has made twice, so it is worth
 * saying once more here.
 */
export function PollachiHorizon() {
  return (
    <div className="horizon" aria-hidden="true">
      <svg viewBox="0 0 1200 470" preserveAspectRatio="xMidYMax meet" className="h-full w-full">
        {/* ── Background: three receding Ghats ridgelines. Furthest is palest and
            lightest; each nearer one is drawn a touch heavier and bluer-to-ink.
            Aerial perspective, done with weight and colour, not opacity. */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            className="ridge-far"
            strokeWidth="1.3"
            d="M0 176 C 150 150 250 120 360 132 C 470 144 540 96 660 108 C 800 122 900 92 1020 110 C 1110 124 1160 140 1200 150"
          />
          <path
            className="ridge-mid"
            strokeWidth="1.6"
            d="M0 214 C 130 196 240 150 380 168 C 520 186 600 138 720 156 C 850 176 960 150 1080 172 C 1140 183 1175 196 1200 202"
          />
          <path
            className="ridge-near"
            strokeWidth="2"
            d="M0 250 C 120 244 210 214 300 224 C 380 233 430 258 520 256 C 560 255 585 236 612 222 C 700 250 820 236 940 256 C 1050 274 1140 262 1200 268"
          />
        </g>

        {/* ── Aliyar reservoir: a still band at the foot of the escarpment. A long
            flat lens with a few reflection ticks — water reads as the one
            horizontal in a frame of diagonals. */}
        <g className="water" fill="none" strokeLinecap="round">
          <path strokeWidth="1.4" d="M150 300 C 320 292 520 292 690 300" />
          <path strokeWidth="1" d="M250 312 h60 M360 312 h40 M470 312 h70 M600 312 h44" />
        </g>

        {/* ── The Valparai road: winds up from the near plain and disappears into
            a gap in the escarpment. Drawn as a few large reversing bends rather
            than a stack of tight hairpins — in this little context, hairpins in
            open space read as a coil, where broad switchbacks aimed at a notch in
            the ridge read as a road going up into the hills. Its top touches the
            near ridgeline so it clearly enters rather than stops in mid-air. One
            continuous stroke, so it draws itself uphill on arrival. */}
        <path
          className="road"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
          d="M980 468
             C 936 440 952 408 900 390
             C 858 375 812 392 802 360
             C 794 334 840 328 836 302
             C 833 282 792 286 784 264
             C 780 253 780 248 782 240"
        />

        {/* ── Foreground: coconut palms on the Pollachi plain. Heaviest weight,
            full ink — the near edge of the aerial-perspective grade. Fronds arc
            up then droop, which is what separates a palm from a starburst. */}
        <g className="palms" fill="none" stroke="currentColor" strokeLinecap="round">
          <g className="palm palm-a">
            <path strokeWidth="3.4" d="M150 470 C 154 400 160 330 156 286" />
            <g strokeWidth="2.2">
              <path d="M156 286 C 146 262 140 246 138 224" />
              <path d="M157 288 C 168 266 177 250 184 232" />
              <path d="M155 289 C 132 276 104 274 82 286" />
              <path d="M157 290 C 180 276 208 277 230 289" />
              <path d="M155 292 C 134 290 108 302 90 326" />
              <path d="M158 292 C 179 290 205 302 223 326" />
            </g>
          </g>
          <g className="palm palm-b">
            <path strokeWidth="3" d="M266 470 C 270 410 275 350 272 312" />
            <g strokeWidth="1.9">
              <path d="M272 312 C 264 292 259 278 258 260" />
              <path d="M273 314 C 283 294 291 281 297 266" />
              <path d="M271 315 C 252 305 229 304 211 314" />
              <path d="M273 316 C 292 305 315 306 333 315" />
              <path d="M271 317 C 254 316 232 326 217 346" />
              <path d="M274 317 C 291 316 313 326 328 346" />
            </g>
          </g>
        </g>

        {/* Plain contour: a single soft line grounding the palms, fading out
            before it reaches the road so the two never fight. */}
        <path
          className="plain"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.2"
          d="M0 360 C 160 352 340 356 470 366"
        />
      </svg>
    </div>
  );
}
