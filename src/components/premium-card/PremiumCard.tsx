'use client';

import type { ReactNode } from 'react';
import { AnimatedBorder } from '@/components/premium-card/AnimatedBorder';
import type { CategoryTheme } from '@/components/premium-card/categoryThemes';
import { PATTERNS } from '@/components/premium-card/patterns';
import { RevealAnimation } from '@/components/premium-card/RevealAnimation';
import { cn } from '@/utils/cn';

/**
 * The premium card shell.
 *
 * This is a *shell*: it owns the surface, the theme, the border beam, the
 * pattern and the reveal, and knows nothing about members. The existing member
 * content — avatar, name, trade, company, the disclosure panel and all five
 * contact actions — is passed in as children and is untouched.
 *
 * ── Things that are load-bearing ─────────────────────────────────────────────
 *
 * `overflow: visible` on the shell, not hidden. The card contains a panel that
 * expands, and hiding overflow clips it shut — that cost a long debugging
 * session once already. The pattern and beam are clipped by their own
 * `border-radius: inherit` instead of by the parent.
 *
 * Press feedback is CSS `:active` (see .premium-card in globals.css), not a JS
 * gesture: instant, free, and it cannot strand the card mid-animation. Hover
 * lift is inside `@media (hover:hover)` so a phone never gets a sticky hover
 * state after a tap.
 *
 * The reveal wrapper ships `opacity:0` in the server HTML — safe here because
 * cards are below the fold and the noscript guard covers JS-off. Do not reuse
 * this shell above the fold without reading hooks/useReveal.ts first.
 */
export function PremiumCard({
  theme,
  index = 0,
  open = false,
  className,
  children,
}: {
  theme: CategoryTheme;
  /** Position in the grid; drives the reveal stagger. */
  index?: number;
  /** Mirrors the disclosure state so the shell can lift and take its accent. */
  open?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <RevealAnimation index={index} className="h-full">
      <article
        className={cn('premium-card', className)}
        data-open={open || undefined}
        style={
          {
            '--member-accent': theme.accent,
            '--member-accent-soft': theme.accentSoft,
            '--card-pattern': PATTERNS[theme.pattern],
            '--card-gradient': theme.gradient,
          } as React.CSSProperties
        }
      >
        <AnimatedBorder accent={theme.accent} />
        {/* The body sits 1px inside the beam layer; that rim is the beam. */}
        <div className="premium-card-body">{children}</div>
      </article>
    </RevealAnimation>
  );
}
