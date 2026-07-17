'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * A .lottie animation, via LottieFiles' `dotlottie-wc` custom element.
 *
 * ── Two deliberate departures from the snippet this came from ────────────────
 *
 * 1. The runtime is an npm dependency, not a <script> from unpkg. A CDN tag adds
 *    a third origin to the QR landing page: another DNS lookup and TLS handshake
 *    on 4G, a third party that sees every visitor's IP, and a hard dependency on
 *    unpkg being up. Bundling costs nothing extra and removes all three.
 *
 * 2. The .lottie files are served from /public, not lottie.host. Same reasoning,
 *    plus permanence: a hosted asset can be moved or deleted and the animation
 *    dies silently. They are 37 kB and 24 kB — small enough to own.
 *
 * ── Loading ──────────────────────────────────────────────────────────────────
 * The element is registered by a dynamic import on mount, so the runtime is
 * split out of the initial bundle and never blocks first paint. Until it
 * registers, an unknown `<dotlottie-wc>` renders as an inert inline element —
 * hence the wrapper reserving the box, so nothing shifts when it appears.
 *
 * Decoration only: aria-hidden, and it never carries meaning. Reduced motion
 * gets the first frame, still, rather than nothing — the drawing is the point,
 * the looping is not.
 */

export function DotLottie({
  src,
  className,
  ariaHidden = true,
}: {
  src: string;
  className?: string;
  ariaHidden?: boolean;
}) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    // Registers <dotlottie-wc> as a custom element. Client-only: it touches
    // customElements, which does not exist during the server render.
    import('@lottiefiles/dotlottie-wc')
      .then(() => {
        if (alive) setReady(true);
      })
      .catch(() => {
        // The animation is decoration. If the chunk fails, the page is fine —
        // the reserved box just stays empty rather than the page breaking.
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className={className} aria-hidden={ariaHidden || undefined}>
      {ready && (
        <dotlottie-wc
          src={src}
          autoplay={!reduced}
          loop={!reduced}
          // The canvas paints white by default, which put an opaque box on the
          // warm paper. Neither .lottie has a background baked in (bg: null), so
          // this is purely the element's default and safe to clear.
          backgroundColor="transparent"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}
