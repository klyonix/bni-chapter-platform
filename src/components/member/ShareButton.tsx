'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button';

/**
 * Share.
 *
 * navigator.share needs HTTPS and a real user gesture, and desktop support is
 * partial — so the clipboard fallback is a normal path, not an edge case. A
 * share button that silently does nothing is worse than no share button.
 *
 * `text` must read correctly both with the URL appended and without it: some
 * targets ignore `text` when `url` is present, others concatenate the two.
 */
export function ShareButton({ title, text, url }: { title: string; text: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    // Resolve relative to absolute here rather than at build time, so the link
    // is correct on localhost, on a preview, and in production alike.
    const absolute = new URL(url, window.location.origin).toString();

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url: absolute });
        return;
      } catch {
        // User dismissed the sheet, or the target rejected it. Fall through to
        // the clipboard rather than leaving the tap unanswered.
      }
    }

    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked (insecure context, or permission denied).
      window.prompt('Copy this link', absolute);
    }
  }

  return (
    <Button variant="onDark" onClick={share} aria-label={`Share ${title}`}>
      {copied ? 'Link copied' : 'Share'}
    </Button>
  );
}
