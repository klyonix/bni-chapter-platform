import { cn } from '@/utils/cn';

/**
 * Build credit.
 *
 * Lives on every page, not just the home page: over 90% of visitors arrive at
 * /civil from a QR code and never see home, so a credit only there would be a
 * credit nobody reads.
 */
export function SiteCredit({ onDark = false }: { onDark?: boolean }) {
  return (
    <p className={cn('text-meta', onDark ? 'text-on-dark-3' : 'text-ink-400')}>
      Built and hosted by{' '}
      <a
        href="https://klyonix.com"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'underline underline-offset-4 transition-colors duration-tap',
          onDark ? 'text-on-dark-2 hover:text-on-dark' : 'text-ink-500 hover:text-ink',
        )}
      >
        KlyONIX Tech Consulting
      </a>
    </p>
  );
}
