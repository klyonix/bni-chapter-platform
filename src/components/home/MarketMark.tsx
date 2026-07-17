/**
 * A small line mark of Pollachi's colonial market arcade.
 *
 * Heritage without a photograph: the repeating arched bays and the low gabled
 * clock of the old market town, drawn at the same weight as the rest of the
 * identity. It sits beside the paragraph about the place, so "founded in
 * Pollachi" has an anchor that is architectural and specific rather than a
 * generic civic silhouette. Ink, foreground weight — this is a near thing, not a
 * distant ridgeline.
 *
 * Decorative. aria-hidden.
 */
export function MarketMark() {
  return (
    <div className="market-mark" aria-hidden="true">
      <svg viewBox="0 0 360 120" preserveAspectRatio="xMidYMax meet" className="h-full w-full">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        >
          {/* Ground and the arcade base line. */}
          <path d="M12 112 h336" />
          <path d="M28 112 V64 M332 112 V64" />

          {/* Five arched bays. Each a pier and a round arch springing off it. */}
          <path d="M28 64 h60 M88 64 h60 M148 64 h60 M208 64 h60 M268 64 h64" />
          <path d="M40 112 V78 C 40 66 52 60 64 60 C 76 60 88 66 88 78 V112" />
          <path d="M100 112 V78 C 100 66 112 60 124 60 C 136 60 148 66 148 78 V112" />
          <path d="M160 112 V78 C 160 66 172 60 184 60 C 196 60 208 66 208 78 V112" />
          <path d="M220 112 V78 C 220 66 232 60 244 60 C 256 60 268 66 268 78 V112" />
          <path d="M280 112 V78 C 280 66 292 60 304 60 C 316 60 320 66 320 78 V112" />

          {/* The low gabled clock over the centre bay. */}
          <path d="M150 64 V40 h60 V64" />
          <path d="M146 40 L180 20 L214 40" />
          <circle cx="180" cy="50" r="8" />
        </g>
      </svg>
    </div>
  );
}
