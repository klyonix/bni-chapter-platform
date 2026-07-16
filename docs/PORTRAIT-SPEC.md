# Portrait & Logo Spec

For whoever shoots the Civil Power Team portraits.

The single highest-leverage decision on this project is not a technical one: it is
**twelve portraits shot in one session, one photographer, one background, one crop.**
Twelve consistent portraits will do more for how considered this site feels than any
component in it. Twelve phone selfies at twelve different white balances will make a
carefully built layout look cheap, and no amount of CSS recovers from that.

If only one thing in this document survives, make it that.

---

## The shot

|                 |                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| **Crop**        | Square, 1:1. Not portrait, not landscape.                                                                   |
| **Framing**     | Head and shoulders. Top of head roughly 10% below the top edge; crop at mid-chest. Eyes on the upper third. |
| **Background**  | One plain, mid-tone backdrop for all twelve. No offices, no site photos, no logos, no gradient.             |
| **Lighting**    | Soft, frontal, even. No hard shadow on the backdrop. Same setup for every member.                           |
| **Expression**  | Relaxed, direct to camera. This is a professional referral, not a passport and not a wedding.               |
| **Wardrobe**    | Whatever they would wear to a client meeting. Ask them to avoid busy patterns.                              |
| **Orientation** | Shoulders square or very slightly turned. Keep it consistent across all twelve.                             |

**Backdrop colour.** The site's background is a warm off-white (`#FAF9F7`) and cards sit on
white. A mid-grey or warm neutral backdrop separates cleanly from both. Avoid pure white
(the head floats with no edge) and avoid black (too severe for the tone we want).

## The file

|                    |                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Delivered size** | 1200 × 1200 px minimum, square, uncropped headroom is fine                          |
| **Format**         | JPEG, quality 85+, sRGB colour profile                                              |
| **Naming**         | `<member-slug>.jpg` — e.g. `hitesh-kumar.jpg`, matching the `slug` in the data file |
| **Do not**         | apply filters, vignettes, borders, or beauty retouching                             |

The site resizes and converts to WebP at build time. Deliver the good original; do not
pre-optimise, and do not send a 200px crop pulled from WhatsApp — WhatsApp recompresses
images and the result cannot be recovered.

Displayed sizes for reference: **72px** on the team page card, **96px** on the profile, and
**240px** embedded into the saved contact card (`.vcf`), which is why the source needs to be
comfortably larger than it looks.

## Company logos

|            |                                                                                                                |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| **Format** | SVG preferred. Otherwise PNG with a transparent background.                                                    |
| **Size**   | 512px on the longest edge minimum (PNG only)                                                                   |
| **Naming** | `<member-slug>-logo.svg` / `.png`                                                                              |
| **Do not** | send a logo screenshotted from a website, a JPEG with a white box behind it, or a logo with a tagline baked in |

Logos appear on the member profile at ~32px and nowhere else. They are deliberately absent
from the team page cards: twelve heterogeneous logos at small size is noise, and it destroys
the grid rhythm the page depends on.

---

## While portraits are pending

Members without a `photo` render their initials, set in Newsreader on a hairline surface.
This is a designed state, not a broken one, and the site ships correctly without a single
photograph. It is still a materially worse experience: a face is what makes a referral feel
like a person rather than a listing.

There is no generic grey person icon anywhere in this system, and there should never be one.

## Checklist before handing files over

- [ ] All twelve shot in the same session, same backdrop, same lighting
- [ ] Every file named to match its `slug` in `src/data/members/civil.ts`
- [ ] Square, 1200px+, JPEG, sRGB
- [ ] No filters, no borders, no retouching
- [ ] Logos supplied as SVG or transparent PNG
- [ ] Each member has given **explicit written consent** for their photo, phone, WhatsApp
      and email to appear on a public, search-indexed page (see plan risk #6). This is the
      step most likely to be skipped and the one most likely to be regretted.
