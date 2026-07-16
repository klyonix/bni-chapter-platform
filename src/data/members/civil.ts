import type { Member } from '@/types';

/**
 * ############################################################################
 * # PLACEHOLDER DATA — REPLACE BEFORE LAUNCH.                                #
 * #                                                                          #
 * # Deliberately fake and deliberately unusable:                             #
 * #                                                                          #
 * #  - Phones are +91 followed by a 0-leading subscriber number. Indian       #
 * #    mobiles always begin 6-9, so these can never belong to a real person.  #
 * #    (A plausible-looking fake number is somebody's actual phone.)          #
 * #  - Names read as "Member One", so no profile can be mistaken for real.    #
 * #  - example.com is IANA-reserved and cannot be registered.                 #
 * ############################################################################
 *
 * Shape notes for whoever fills this in with real data:
 *
 *  - `preferredName` is what the member is called ("Hitesh"), and it feeds the
 *    prefilled WhatsApp greeting. Ask each member; never derive it.
 *  - `photo` is omitted throughout because the shoot is pending. Absent photos
 *    render initials, which is a designed state (see docs/PORTRAIT-SPEC.md).
 *  - `profession` must be a slug from src/data/professions.ts. A typo is a
 *    typecheck error, not a broken chip.
 *  - `mapsUrl` is a verified Maps link or omitted. Never constructed from an
 *    address — a wrong pin is worse than no pin.
 *  - Contact variety below is intentional: it exercises the WhatsApp-only,
 *    no-website and no-maps paths that real data will contain.
 */
export const civilMembers: Member[] = [
  {
    slug: 'member-one',
    name: 'Member One',
    preferredName: 'One',
    profession: 'architect',
    company: 'Placeholder Company One',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000001',
      whatsapp: '+910000000001',
      email: 'one@example.com',
      website: 'https://example.com',
      mapsUrl: 'https://maps.google.com/?q=0,0',
    },
    order: 1,
  },
  {
    slug: 'member-two',
    name: 'Member Two',
    preferredName: 'Two',
    profession: 'architect',
    company: 'Placeholder Company Two',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000002',
      email: 'two@example.com',
    },
    order: 2,
  },
  {
    slug: 'member-three',
    name: 'Member Three',
    preferredName: 'Three',
    profession: 'structural-engineer',
    company: 'Placeholder Company Three',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000003',
      whatsapp: '+910000000003',
      email: 'three@example.com',
      website: 'https://example.com',
    },
    order: 3,
  },
  {
    slug: 'member-four',
    name: 'Member Four',
    preferredName: 'Four',
    profession: 'civil-contractor',
    company: 'Placeholder Company Four',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000004',
      whatsapp: '+910000000004',
      mapsUrl: 'https://maps.google.com/?q=0,0',
    },
    order: 4,
  },
  {
    // WhatsApp-only. Exercises the consent path in plan risk #6, where a member
    // publishes a messaging channel but withholds voice.
    slug: 'member-five',
    name: 'Member Five',
    preferredName: 'Five',
    profession: 'civil-contractor',
    company: 'Placeholder Company Five',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      whatsapp: '+910000000005',
      email: 'five@example.com',
    },
    order: 5,
  },
  {
    slug: 'member-six',
    name: 'Member Six',
    preferredName: 'Six',
    profession: 'interior-designer',
    company: 'Placeholder Company Six',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000006',
      whatsapp: '+910000000006',
      email: 'six@example.com',
      website: 'https://example.com',
      mapsUrl: 'https://maps.google.com/?q=0,0',
    },
    order: 6,
  },
  {
    slug: 'member-seven',
    name: 'Member Seven',
    preferredName: 'Seven',
    profession: 'electrical-contractor',
    company: 'Placeholder Company Seven',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000007',
      whatsapp: '+910000000007',
      email: 'seven@example.com',
    },
    order: 7,
  },
  {
    slug: 'member-eight',
    name: 'Member Eight',
    preferredName: 'Eight',
    profession: 'plumbing-contractor',
    company: 'Placeholder Company Eight',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000008',
      whatsapp: '+910000000008',
    },
    order: 8,
  },
  {
    slug: 'member-nine',
    name: 'Member Nine',
    preferredName: 'Nine',
    profession: 'painting-contractor',
    company: 'Placeholder Company Nine',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000009',
      whatsapp: '+910000000009',
      email: 'nine@example.com',
      website: 'https://example.com',
    },
    order: 9,
  },
  {
    slug: 'member-ten',
    name: 'Member Ten',
    preferredName: 'Ten',
    profession: 'modular-kitchen',
    company: 'Placeholder Company Ten',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000010',
      whatsapp: '+910000000010',
      email: 'ten@example.com',
      website: 'https://example.com',
      mapsUrl: 'https://maps.google.com/?q=0,0',
    },
    order: 10,
  },
  {
    slug: 'member-eleven',
    name: 'Member Eleven',
    preferredName: 'Eleven',
    profession: 'flooring-tiles',
    company: 'Placeholder Company Eleven',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000011',
      whatsapp: '+910000000011',
      email: 'eleven@example.com',
    },
    order: 11,
  },
  {
    slug: 'member-twelve',
    name: 'Member Twelve',
    preferredName: 'Twelve',
    profession: 'property-legal',
    company: 'Placeholder Company Twelve',
    powerTeams: ['civil'],
    description:
      'Placeholder description. Replace with the member’s real business description before launch.',
    services: ['Placeholder service A', 'Placeholder service B', 'Placeholder service C'],
    idealReferral:
      'Placeholder referral ask. Replace with what this member wants to be referred for.',
    contact: {
      phone: '+910000000012',
      whatsapp: '+910000000012',
      email: 'twelve@example.com',
      website: 'https://example.com',
    },
    order: 12,
  },
];
