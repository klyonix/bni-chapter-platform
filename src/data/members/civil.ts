import type { Member } from '@/types';

/**
 * The Civil Power Team — real members, in the chapter's official order.
 *
 * Source of truth: the BNI Azpire 14.0 "Ashtivaram" roster (authoritative,
 * confirmed by the chapter). Array order IS the display order — the grid does
 * not shuffle.
 *
 * Consent: the chapter has confirmed every member agreed to their number
 * appearing on a public, search-indexed page. Do not add a member here without
 * that.
 *
 * PHONE NUMBERS ARE NORMALISED TO E.164 (+91…). `wa.me` accepts digits only, so
 * a missing +91 loses the lead silently. Stored canonical here, stripped at
 * link-build time in lib/links.ts.
 *
 * TODO(content) — still missing, and worth chasing in this order:
 *   1. `idealReferral` for all twelve — the only field that speaks to the person
 *      doing the referring.
 *   2. `photo` and `companyLogo` — see docs/PORTRAIT-SPEC.md.
 *   3. `description` and `services`, in each member's own words.
 *   4. `email`, `website`, `mapsUrl` where they exist.
 *
 * `preferredName` is a best guess and NEEDS CONFIRMING — it is what the prefilled
 * WhatsApp greeting says ("Hi Shivaji, …").
 */
export const civilMembers: Member[] = [
  {
    slug: 'senthil-kumar-g',
    order: 1,
    name: 'Senthil Kumar G',
    preferredName: 'Senthil Kumar',
    profession: 'land-promoter',
    company: 'Terrain Realty',
    photo: '/images/members/senthil-kumar-g.png',
    powerTeams: ['civil'],
    contact: { phone: '+919843454619', whatsapp: '+919843454619' },
  },
  {
    slug: 'nagulan-b',
    order: 2,
    name: 'Nagulan Balakrishnan',
    preferredName: 'Nagulan',
    profession: 'architecture',
    company: 'Earthbound Studios',
    photo: '/images/members/nagulan-b.png',
    powerTeams: ['civil'],
    contact: { phone: '+918056569947', whatsapp: '+918056569947' },
  },
  {
    slug: 'sharan-rajkumar',
    order: 3,
    name: 'Sharan Rajkumar GK',
    preferredName: 'Sharan',
    profession: 'builder',
    company: 'G.K. Builders & Co',
    photo: '/images/members/sharan-rajkumar.png',
    powerTeams: ['civil'],
    contact: { phone: '+919842146664', whatsapp: '+919842146664' },
  },
  {
    slug: 'gopinath-r',
    order: 4,
    name: 'Gopinath R',
    preferredName: 'Gopinath',
    profession: 'approvals',
    company: 'Lakchan Associates',
    photo: '/images/members/gopinath-r.png',
    powerTeams: ['civil'],
    contact: { phone: '+919659118699', whatsapp: '+919659118699' },
  },
  {
    slug: 'dhanabal-s',
    order: 5,
    name: 'Dhanabal S',
    preferredName: 'Dhanabal',
    profession: 'cement-concrete',
    company: 'Agam Shri Traders',
    photo: '/images/members/dhanabal-s.png',
    powerTeams: ['civil'],
    contact: { phone: '+919842222293', whatsapp: '+919842222293' },
  },
  {
    slug: 'hitesh-patel',
    order: 6,
    name: 'Hitesh Patel',
    preferredName: 'Hitesh',
    profession: 'windows-doors',
    company: 'Artica Windows & Doors',
    photo: '/images/members/hitesh-patel.png',
    powerTeams: ['civil'],
    contact: { phone: '+919843120677', whatsapp: '+919843120677' },
  },
  {
    slug: 'dharmaraj-c',
    order: 7,
    name: 'Dharmaraj Chinnasamy',
    preferredName: 'Dharmaraj',
    profession: 'false-ceiling',
    company: 'Apple Interiors',
    photo: '/images/members/dharmaraj-c.png',
    powerTeams: ['civil'],
    contact: { phone: '+919942292888', whatsapp: '+919942292888' },
  },
  {
    slug: 'shivaji-v',
    order: 8,
    name: 'Shivaji Venugopal',
    preferredName: 'Shivaji',
    profession: 'tiles',
    company: 'Sri Senthur Tiles & Granites',
    photo: '/images/members/shivaji-v.png',
    powerTeams: ['civil'],
    contact: { phone: '+919789981500', whatsapp: '+919789981500' },
  },
  {
    slug: 'yuvaraj-v',
    order: 9,
    name: 'Yuvaraj V',
    preferredName: 'Yuvaraj',
    profession: 'hardware',
    company: 'Shri Gangai Traders',
    photo: '/images/members/yuvaraj-v.png',
    powerTeams: ['civil'],
    contact: { phone: '+919942590000', whatsapp: '+919942590000' },
  },
  {
    slug: 'viswanathan-s',
    order: 10,
    name: 'Viswanathan S',
    preferredName: 'Viswanathan',
    profession: 'interior-decorator',
    company: 'Meevish Interiors',
    photo: '/images/members/viswanathan-s.png',
    powerTeams: ['civil'],
    contact: { phone: '+919788794236', whatsapp: '+919788794236' },
  },
  {
    slug: 'mohammed-sajid',
    order: 11,
    name: 'Mohammed Sajid',
    preferredName: 'Sajid',
    profession: 'curtains-nets',
    company: 'Home Decor',
    photo: '/images/members/mohammed-sajid.png',
    powerTeams: ['civil'],
    contact: { phone: '+918675551515', whatsapp: '+918675551515' },
  },
  {
    slug: 'raghvaran-d',
    order: 12,
    name: 'Raghvaran D',
    preferredName: 'Raghvaran',
    profession: 'water-systems',
    company: 'Aqua Plus RO',
    photo: '/images/members/raghvaran-d.png',
    powerTeams: ['civil'],
    contact: { phone: '+918012588676', whatsapp: '+918012588676' },
  },
];
