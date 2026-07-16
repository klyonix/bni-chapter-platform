/**
 * Joins class names, dropping falsy values.
 *
 * Deliberately not clsx/tailwind-merge: variants here are closed sets defined
 * in one place, so there is nothing to merge and no conflict to resolve. Revisit
 * if components start accepting arbitrary overriding utility classes.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
