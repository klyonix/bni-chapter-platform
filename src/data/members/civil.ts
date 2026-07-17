import type { Member } from '@/types';

/**
 * The Civil Power Team — real members, as supplied by the chapter.
 *
 * Consent: the chapter has confirmed every member agreed to their number
 * appearing on a public, search-indexed page. Do not add a member here without
 * that.
 *
 * PHONE NUMBERS ARE NORMALISED TO E.164 (+91…). Four arrived without a country
 * code (Sharan, Shivaji, Yuvaraj, Nagulan, Gopinath, Desingu, Dhanabal, Senthil).
 * `wa.me` accepts digits only and rejects anything else *after* opening
 * WhatsApp, so a missing +91 loses the lead silently. Stored canonical here,
 * stripped at link-build time in lib/links.ts.
 *
 * TODO(content) — still missing, and worth chasing in this order:
 *   1. `idealReferral` for all twelve. This is the point of the product: the
 *      only field that speaks to the person doing the referring. Nothing else
 *      on this list matters as much.
 *   2. `photo` — see docs/PORTRAIT-SPEC.md. One session, one backdrop.
 *   3. `description` and `services`, in each member's own words.
 *   4. `email`, `website`, `mapsUrl` where they exist.
 *
 * Do not invent any of the above. A description of a real business that the
 * owner never wrote is a claim published under their name.
 *
 * `preferredName` is a best guess from the supplied names and NEEDS CONFIRMING —
 * it is what the prefilled WhatsApp greeting says ("Hi Shivaji, …"), so it is
 * the first thing a member ever reads from this site. Ask each of them.
 */
export const civilMembers: Member[] = [
  {
    slug: 'sharan-rajkumar',
    name: 'Sharan Rajkumar',
    preferredName: 'Sharan',
    profession: 'builder',
    company: 'G.K. Builders',
    powerTeams: ['civil'],
    contact: { phone: '+919842146664', whatsapp: '+919842146664' },
  },
  {
    slug: 'shivaji-v',
    name: 'Shivaji V.',
    preferredName: 'Shivaji',
    profession: 'tiles',
    company: 'Sri Senthur Tiles',
    powerTeams: ['civil'],
    contact: { phone: '+919789981500', whatsapp: '+919789981500' },
  },
  {
    slug: 'viswanathan-s',
    name: 'Viswanathan S.',
    preferredName: 'Viswanathan',
    profession: 'interior-decorator',
    company: 'Meevish Interiors',
    powerTeams: ['civil'],
    contact: { phone: '+919788794236', whatsapp: '+919788794236' },
  },
  {
    slug: 'yuvaraj-v',
    name: 'Yuvaraj V.',
    preferredName: 'Yuvaraj',
    profession: 'hardware',
    company: 'Shri Gangai Traders',
    powerTeams: ['civil'],
    contact: { phone: '+919942590000', whatsapp: '+919942590000' },
  },
  {
    slug: 'raghvaran-d',
    name: 'Raghvaran D.',
    preferredName: 'Raghvaran',
    profession: 'water-systems',
    company: 'Aqua Plus RO',
    powerTeams: ['civil'],
    contact: { phone: '+918012588676', whatsapp: '+918012588676' },
  },
  {
    slug: 'nagulan-b',
    name: 'Nagulan B.',
    preferredName: 'Nagulan',
    profession: 'building-materials',
    company: 'Castle Stones',
    powerTeams: ['civil'],
    contact: { phone: '+918056569947', whatsapp: '+918056569947' },
  },
  {
    slug: 'hitesh-patel',
    name: 'Hitesh Patel',
    preferredName: 'Hitesh',
    profession: 'windows-doors',
    company: 'Artica Windows & Doors',
    powerTeams: ['civil'],
    contact: { phone: '+919843120677', whatsapp: '+919843120677' },
  },
  {
    slug: 'gopinath-r',
    name: 'Gopinath R.',
    preferredName: 'Gopinath',
    profession: 'approvals',
    company: 'Lakchan Associates',
    powerTeams: ['civil'],
    contact: { phone: '+919659118699', whatsapp: '+919659118699' },
  },
  {
    slug: 'dharmaraj-c',
    name: 'Dharmaraj C.',
    preferredName: 'Dharmaraj',
    profession: 'false-ceiling',
    company: 'Apple Interiors',
    powerTeams: ['civil'],
    contact: { phone: '+919942292888', whatsapp: '+919942292888' },
  },
  {
    slug: 'desingu-raja-p',
    name: 'Desingu Raja P.',
    // Full name, confirmed with the chapter. Not shortened to "Desingu".
    preferredName: 'Desingu Raja',
    profession: 'painter',
    company: 'Dev Pro Painting',
    powerTeams: ['civil'],
    contact: { phone: '+918072714909', whatsapp: '+918072714909' },
  },
  {
    slug: 'dhanabal-s',
    name: 'Dhanabal S.',
    preferredName: 'Dhanabal',
    profession: 'cement-concrete',
    company: 'Agam Shri Traders',
    powerTeams: ['civil'],
    contact: { phone: '+919842222293', whatsapp: '+919842222293' },
  },
  {
    slug: 'senthil-kumar-g',
    name: 'Senthil Kumar G.',
    // Full name, confirmed with the chapter. Not shortened to "Senthil".
    preferredName: 'Senthil Kumar',
    profession: 'land-promoter',
    company: 'Terrain Realty',
    powerTeams: ['civil'],
    contact: { phone: '+919843454619', whatsapp: '+919843454619' },
  },
];
