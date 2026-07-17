/**
 * Build credit.
 *
 * Lives on every page, not just the home page: over 90% of visitors arrive at
 * /civil from a QR code and never see home, so a credit only there would be a
 * credit nobody reads.
 */
export function SiteCredit() {
  return (
    <p className="text-meta text-ink-400">
      Built and hosted by{' '}
      <a
        href="https://klyonix.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink-500 underline underline-offset-4 transition-colors duration-tap hover:text-ink"
      >
        KlyONIX Tech Consulting
      </a>
    </p>
  );
}
