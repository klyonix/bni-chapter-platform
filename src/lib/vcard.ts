import { professionLabel } from '@/data/professions';
import type { Member } from '@/types';

/**
 * vCard 3.0 builder.
 *
 * 3.0 rather than 4.0: it is older, more boring, and imports reliably on iOS
 * Contacts, which 4.0 does not always.
 *
 * The escaping below is the whole reason this is a separate file. A member whose
 * company is "Kumar, Raman & Co", or a referral ask containing a semicolon,
 * silently produces a contact with mangled or missing fields. Nobody proofreads
 * a .vcf, so the failure surfaces weeks later as "your site saved my name wrong".
 */

/** Backslash, comma and semicolon are field separators and must be escaped. */
function esc(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\r?\n/g, '\\n');
}

/**
 * RFC 2426 line folding: lines wrap at 75 octets with a space continuing them.
 * Long NOTE fields exceed this easily and some Android importers do choke.
 */
function fold(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 74) {
    chunks.push(' ' + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  if (rest.length) chunks.push(' ' + rest);
  return chunks.join('\r\n');
}

export function buildVCard(
  member: Member,
  opts: { teamName: string; chapterName: string; profileUrl: string },
): string {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

  // N is structured and guessed; FN is what clients actually display, so the
  // display name is always correct even when this split is not.
  const parts = member.name.trim().split(/\s+/);
  const given = parts[0] ?? '';
  const family = parts.slice(1).join(' ');
  lines.push(`N:${esc(family)};${esc(given)};;;`);
  lines.push(`FN:${esc(member.name)}`);
  lines.push(`ORG:${esc(member.company)}`);
  lines.push(`TITLE:${esc(professionLabel(member.profession))}`);

  if (member.contact.phone) {
    lines.push(`TEL;TYPE=CELL,VOICE:${esc(member.contact.phone)}`);
  }
  if (member.contact.whatsapp && member.contact.whatsapp !== member.contact.phone) {
    lines.push(`TEL;TYPE=CELL:${esc(member.contact.whatsapp)}`);
  }
  if (member.contact.email) {
    lines.push(`EMAIL;TYPE=INTERNET,WORK:${esc(member.contact.email)}`);
  }
  if (member.contact.website) {
    lines.push(`URL:${esc(member.contact.website)}`);
  }

  // Six months on, the visitor has forgotten who this is. The note is what makes
  // a saved number still worth having.
  const note = [
    `${opts.chapterName}, ${opts.teamName}.`,
    `Refer when you hear: ${member.idealReferral}`,
    `Profile: ${opts.profileUrl}`,
  ].join('\n');
  lines.push(`NOTE:${esc(note)}`);

  // Searching "BNI" in a phone's contacts then surfaces the whole team.
  lines.push(`CATEGORIES:${esc(opts.chapterName)},${esc(opts.teamName)}`);

  lines.push('END:VCARD');

  return lines.map(fold).join('\r\n') + '\r\n';
}

/** Reads like something a person chose, in the iOS share sheet and downloads tray. */
export function vCardFilename(member: Member, chapterName: string): string {
  return `${member.name} - ${chapterName}.vcf`;
}
