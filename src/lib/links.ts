/**
 * Contact link builders. Nothing else constructs these URLs.
 *
 * The formats are fiddly in ways that fail silently on a phone and look fine on
 * a desktop, so they live in one place.
 */

/**
 * WhatsApp deep link.
 *
 * The number must be digits only — no `+`, no spaces. `wa.me/+91 98765 43210`
 * opens WhatsApp and *then* reports the number as invalid, which loses the lead
 * without any visible error. Numbers are stored E.164 and stripped here, so the
 * data stays canonical and the wire format is derived.
 *
 * Passing no `number` opens WhatsApp's contact picker instead, which is how a
 * profile gets referred on to somebody else.
 */
export function waLink(number: string | undefined, text?: string): string {
  const digits = (number ?? '').replace(/\D/g, '');
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${digits}${query}`;
}

/** `tel:` wants the `+`, unlike wa.me. */
export function telLink(e164: string): string {
  return `tel:${e164}`;
}

export function mailtoLink(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ''}`;
}
