import type { Config } from 'tailwindcss';

/** Token indirection: channels live in globals.css, alpha stays composable. */
const rgb = (token: string) => `rgb(var(--${token}) / <alpha-value>)`;

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/layouts/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: rgb('ink'),
          700: rgb('ink-700'),
          500: rgb('ink-500'),
          400: rgb('ink-400'),
          200: rgb('ink-200'),
        },
        hairline: rgb('hairline'),
        paper: rgb('paper'),
        surface: rgb('surface'),
        accent: {
          DEFAULT: rgb('accent'),
          ink: rgb('accent-ink'),
        },
        whatsapp: rgb('whatsapp'),

        // Civil section only. See the note in globals.css.
        canvas: rgb('canvas'),
        panel: rgb('panel'),
        'panel-line': rgb('panel-line'),
        'on-dark': {
          DEFAULT: rgb('on-dark'),
          2: rgb('on-dark-2'),
          3: rgb('on-dark-3'),
        },
      },

      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },

      // Plan §7. Paired sizes and leading so callers cannot drift.
      fontSize: {
        'display-l': ['2.125rem', { lineHeight: '2.375rem', fontWeight: '500' }], // 34/38
        'display-m': ['1.75rem', { lineHeight: '2rem', fontWeight: '500' }], // 28/32
        quote: ['1.125rem', { lineHeight: '1.75rem' }], // 18/28
        'body-l': ['1.0625rem', { lineHeight: '1.625rem' }], // 17/26
        body: ['1rem', { lineHeight: '1.5rem' }], // 16/24
        label: ['0.9375rem', { lineHeight: '1.25rem', fontWeight: '500' }], // 15/20
        meta: ['0.875rem', { lineHeight: '1.25rem' }], // 14/20
        micro: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.08em', fontWeight: '500' }], // 12/16 tracked
      },

      // One radius. The brief rejects overly rounded components; large radii
      // are a template tell. Pills are opt-in via `rounded-full` on chips only.
      borderRadius: {
        DEFAULT: '6px',
        md: '6px',
        lg: '6px',
      },

      // Borders carry elevation. This is the only shadow in the system.
      boxShadow: {
        card: '0 1px 2px rgb(20 17 15 / 0.04)',
        none: 'none',
      },

      // 44px minimum tap target (§13), expressed as a token so it is not
      // re-guessed at each call site.
      spacing: {
        tap: '2.75rem', // 44px
        'tap-lg': '3rem', // 48px — primary profile actions
      },

      transitionDuration: {
        tap: '150ms',
        chip: '200ms',
      },
    },
  },
  plugins: [],
};

export default config;
