/**
 * Chapter facts and message copy.
 *
 * TODO(content): meeting details are unconfirmed. Stats are left out entirely —
 * ship the section blank rather than with an invented number.
 */
export const CHAPTER = {
  name: 'BNI Azpire',
  region: 'Coimbatore Rural',
  officialUrl: 'https://bni-coimbatorerural.in/coimbatore-rural-bni-azpire/en-IN/index',
  meeting: { day: 'TBC', time: 'TBC', venue: 'TBC' },
};

/**
 * The prefilled WhatsApp opener.
 *
 * The trailing blank line is deliberate. WhatsApp drops the cursor at the end of
 * prefilled text, so ending on a full stop invites an immediate send and the
 * member gets a bare hello they have to chase. An empty line prompts the visitor
 * to type what they actually need.
 *
 * It deliberately does not state the visitor's requirement — prefilling "I need
 * an architect" puts words in their mouth and forces a delete when it is wrong.
 */
export function whatsappIntro(preferredName: string, teamName: string): string {
  return `Hi ${preferredName}, I found your profile on the BNI Azpire ${teamName} page.\n\n`;
}

export function emailSubject(teamName: string): string {
  return `Enquiry via BNI Azpire ${teamName}`;
}
