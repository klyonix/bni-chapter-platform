'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * The BNI brand mark, as a short logo-reveal video, sitting on the hero eyebrow.
 *
 * ── Why muted, and why a tap ─────────────────────────────────────────────────
 * The clip has audio, but no browser will autoplay sound without a prior user
 * gesture — a QR visitor lands with none, so sound-on-load is impossible, not a
 * setting we forgot. So it autoplays MUTED (which is always allowed) and the
 * whole mark is a button: a tap unmutes and replays from the top, and that tap
 * is the gesture that lets the audio through.
 *
 * ── Poster + reduced motion ──────────────────────────────────────────────────
 * The poster is the resting logo frame, so the mark reads as the BNI logo before
 * a single byte of video arrives and if the video never loads at all. Under
 * prefers-reduced-motion we never autoplay — the poster simply stands in as a
 * still logo — but a deliberate tap still plays it, sound and all.
 *
 * The source is a self-hosted 720p .mp4 (H.264/AAC). The original was a 4K .mov;
 * the .mov container is unreliable in Android Chrome and in-app webviews, which
 * is exactly the QR audience, so it is not shipped.
 */
export function BniMark() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    // Muted autoplay: allowed everywhere, and a no-op where a policy still
    // blocks it — the poster stays, which is the same resting logo.
    v.play().catch(() => {});
  }, [reduced]);

  function playWithSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    setSoundOn(true);
    v.play().catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={playWithSound}
      aria-label="Play the BNI intro with sound"
      className="group relative block h-9 shrink-0 overflow-hidden rounded-md border border-hairline bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      style={{ aspectRatio: '16 / 9' }}
    >
      <video
        ref={videoRef}
        poster="/images/bni-poster.jpg"
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      >
        <source src="/bni.mp4" type="video/mp4" />
      </video>

      {/* Sound affordance: a speaker that reads "muted" until tapped. Decorative
          — the button's aria-label carries the meaning. */}
      <span
        aria-hidden="true"
        className="absolute bottom-0.5 right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-black/60 text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-2 w-2">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
          {!soundOn && (
            <path
              d="M16 8l6 8M22 8l-6 8"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </svg>
      </span>
    </button>
  );
}
