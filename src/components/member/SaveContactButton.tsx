'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button';

/**
 * Save Contact.
 *
 * The vCard string is built on the server and passed in, so this component only
 * handles the download. A Blob plus createObjectURL is the reliable path on iOS
 * Safari and Android Chrome; a `data:` URL is tempting (no JS at all) but iOS
 * tends to open it as text rather than hand it to Contacts.
 *
 * Known caveat: QR scanners often open pages inside the WhatsApp or Instagram
 * in-app webview, which is the least forgiving place for Blob downloads. Worth
 * testing on a real phone before launch.
 */
export function SaveContactButton({ vcard, filename }: { vcard: string; filename: string }) {
  const [saved, setSaved] = useState(false);

  function download() {
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoke on the next tick — revoking synchronously can cancel the download.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Button variant="primary" size="lg" fullWidth onClick={download}>
      {saved ? 'Contact downloaded' : 'Save to contacts'}
    </Button>
  );
}
