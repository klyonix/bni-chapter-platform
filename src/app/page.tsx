import { Container } from '@/components/primitives/Container';

/**
 * Placeholder home. Replaced in full at roadmap phase 7.
 *
 * Kept on the design tokens rather than left on the scaffold's defaults,
 * because this page is what azpire.klyonix.in serves today.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center">
      <Container>
        <p className="text-micro uppercase text-ink-400">BNI Azpire</p>
        <h1 className="mt-3 font-display text-display-l text-ink">Coimbatore Rural</h1>
        <p className="mt-4 text-body-l text-ink-700">
          The chapter portfolio is being built. The Civil Power Team page goes live here first.
        </p>
        <p className="mt-10 text-meta text-ink-400">Hosted by KlyONIX Tech Consulting</p>
      </Container>
    </main>
  );
}
