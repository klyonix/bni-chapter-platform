/**
 * The construction scene behind the Civil page.
 *
 * Hand-drawn SVG, animated in CSS: about 4 kB, no runtime, no licence, no JS.
 * It is fixed to the viewport and fades out as the page scrolls, so it is fully
 * itself at the top and gone by the end.
 *
 * Line-work rather than illustration. A cartoon crane would fight the Newsreader
 * serif and read as clip-art; a drawn one reads as a drawing, which is what a
 * civil team actually produces. Same 1.5 weight as the grid and the grove.
 */
export function ConstructionHero() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMin meet" className="h-full w-full">
        {/* stroke="currentColor" is load-bearing: without it the paths default to
            stroke:none and the entire scene renders invisibly, which looks
            exactly like the component never mounted. The colour comes from
            `color` on .hero-scene. */}
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* Ground */}
          <path d="M0 700h1200" className="hero-ground" strokeWidth="1.5" />

          {/* Building under construction — floors draw in one after another. */}
          <g className="hero-frame" strokeWidth="1.5">
            <path className="hero-floor hero-floor-1" d="M360 700V560h240v140" />
            <path className="hero-floor hero-floor-2" d="M360 560V430h240v130" />
            <path className="hero-floor hero-floor-3" d="M360 430V310h240v120" />
            <path className="hero-floor hero-floor-4" d="M385 700v-390M480 700v-390M575 700v-390" />
            <path className="hero-floor hero-floor-5" d="M360 495h240M360 370h240" />
          </g>

          {/* Crane. The jib sways; the hook and its load ride with it. */}
          <g className="hero-crane" strokeWidth="1.5">
            <path d="M800 700V250" className="hero-mast" />
            <path
              d="M782 700h36M790 640h20M790 560h20M790 480h20M790 400h20M790 320h20"
              className="hero-mast"
            />
            <g className="hero-jib">
              <path d="M640 250h330" />
              <path d="M800 250 700 215M800 250l90 -35" />
              <path d="M800 215v35" />
              <path d="M700 215h180" />
              {/* Counterweight */}
              <path d="M655 250v26h30v-26" />
              {/* Hoist line and load */}
              <g className="hero-hook">
                <path d="M920 250v150" />
                <path d="M900 400h40v28h-40z" />
              </g>
            </g>
          </g>

          {/* A second, quieter tower far off — depth without detail. */}
          <g className="hero-far" strokeWidth="1.2">
            <path d="M150 700V470h150v230" />
            <path d="M150 540h150M150 610h150M225 470v230" />
          </g>

          {/* Survey marks: blueprint dimension lines that fade in and out. */}
          <g className="hero-dims" strokeWidth="1">
            <path className="hero-dim hero-dim-1" d="M360 745h240M360 738v14M600 738v14" />
            <path className="hero-dim hero-dim-2" d="M640 190h330M640 183v14M970 183v14" />
          </g>
        </g>
      </svg>
    </div>
  );
}
