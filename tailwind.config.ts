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

      /**
       * Radius scale.
       *
       * `card` (20px) for card shells, `xl` (12px) for controls inside them,
       * `rounded-full` for pills and icon buttons. Three values, each with a job
       * — the earlier single 6px was right for a flat list and reads mean on a
       * raised surface.
       */
      borderRadius: {
        DEFAULT: '6px',
        md: '6px',
        lg: '6px',
        xl: '12px',
        card: 'var(--radius-card)',
      },

      /**
       * Shadow scale — three named steps, swapped on state change.
       *
       * Each is two shadows: a tight contact shadow and a wide ambient one. A
       * single blurred drop shadow is what makes cards look printed on rather
       * than resting on the page.
       *
       * These are swapped between, never animated: box-shadow is not a
       * compositor property, so transitioning it repaints every frame. State
       * changes move `transform` and switch the shadow token in one step.
       */
      boxShadow: {
        card: '0 1px 2px rgb(20 17 15 / 0.04), 0 8px 24px -12px rgb(20 17 15 / 0.08)',
        'card-hover': '0 2px 4px rgb(20 17 15 / 0.05), 0 18px 40px -16px rgb(20 17 15 / 0.16)',
        'card-press': '0 1px 2px rgb(20 17 15 / 0.06), 0 4px 12px -6px rgb(20 17 15 / 0.10)',
        none: 'none',
      },

      /**
       * Tap targets. `tap` is now 48px, not 44.
       *
       * 44 is the iOS floor and what the earlier plan used; the redesign brief
       * asks for 48, which is also Android's and WCAG 2.5.5's. Raising the floor
       * is safe — nothing was relying on the extra 4px being absent.
       */
      spacing: {
        tap: '3rem', // 48px — the minimum for anything tappable
        'tap-lg': '3.5rem', // 56px — primary CTAs
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
