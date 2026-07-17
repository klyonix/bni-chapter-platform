/**
 * A section divider drawn as an elevation profile of the Ghats.
 *
 * The home page's through-line: the same ridgeline from the hero, flattened to a
 * hairline and set between sections in place of a plain rule. It is a horizon,
 * so it reads as a divider without being a box; and it quietly repeats the one
 * landscape the identity is built on, so the page holds together as a place
 * rather than a stack of panels.
 *
 * Decorative — aria-hidden, and it carries no meaning a screen reader needs.
 */
export function RidgeRule() {
  return (
    <div className="ridge-rule" aria-hidden="true">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="block h-6 w-full">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          d="M0 18 C 90 16 150 8 230 11 C 320 14 360 4 460 7 C 560 10 610 18 700 16 C 800 14 850 6 950 9 C 1050 12 1120 18 1200 15"
        />
      </svg>
    </div>
  );
}
