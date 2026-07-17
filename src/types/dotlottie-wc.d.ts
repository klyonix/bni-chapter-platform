/**
 * JSX typing for LottieFiles' <dotlottie-wc> custom element.
 *
 * In a .d.ts rather than inline in the component: augmenting React's JSX
 * namespace requires the `namespace` keyword, which @typescript-eslint bans in
 * .tsx source. Declaration files are the right home for ambient types anyway.
 *
 * Only the attributes actually used are declared. The element has more; add them
 * here when they are needed rather than widening this to `any`, which would make
 * every typo compile.
 */
import 'react';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': {
        src: string;
        autoplay?: boolean;
        loop?: boolean;
        speed?: number;
        backgroundColor?: string;
        style?: React.CSSProperties;
        class?: string;
      };
    }
  }
}
