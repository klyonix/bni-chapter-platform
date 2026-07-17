/**
 * Generates the brand mark and share image from one source of truth.
 *
 * The mark is the Western Ghats ridge with a BNI-red point rising over it — the
 * same identity the home page is built on ("at the foot of the Western Ghats"),
 * reduced to a glyph that still reads at 16px. Filled silhouettes, not
 * line-work: thin strokes vanish at favicon size, a filled range does not.
 *
 * Outputs (all committed, served straight from /public on a static host):
 *   public/icon.svg           crisp vector favicon for modern browsers
 *   public/favicon.ico        16/32/48 PNG-in-ICO for legacy + link crawlers
 *   public/apple-icon.png     180×180 iOS home screen
 *   public/images/og-default.png  1200×630 link-share card
 *
 * Run: node scripts/generate-brand.mjs
 */
import { Buffer } from 'node:buffer';
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const PAPER = '#FAF9F7';
const INK = '#14110F';
const INK_700 = '#3D3833';
const INK_400 = '#786F66';
const RED = '#CF2030';
const BLUE = '#5B7FA6';

// ── The mark ────────────────────────────────────────────────────────────────
// A red point rising over an ink Ghats range on a warm-paper tile. The point
// sits mostly above the ridge with its base occluded, so it reads as behind the
// hills rather than pasted on top.
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect x="16" y="16" width="480" height="480" rx="104" fill="${PAPER}"/>
  <circle cx="332" cy="190" r="58" fill="${RED}"/>
  <path fill="${INK}" d="M64 456 L64 352 L168 244 L236 312 L312 206 L372 298 L440 236 L448 456 Z"/>
</svg>`;

// ── The share card ──────────────────────────────────────────────────────────
// Editorial, left-aligned, mostly paper. The headline is the same line the home
// hero opens on. A ridgeline and the red point echo the mark along the bottom so
// a shared link previews as the same place, not a red box.
//
// Type is set in the Newsreader/Inter fallbacks (Georgia, Helvetica) rather than
// the web fonts: librsvg has no access to the next/font files, and the declared
// fallbacks are close enough for a preview card that is never seen at reading
// size.
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>

  <g transform="translate(96 132)">
    <circle cx="7" cy="-6" r="7" fill="${RED}"/>
    <text x="28" y="0" font-family="Helvetica, Arial, sans-serif" font-size="22"
          letter-spacing="3" fill="${INK_400}">BNI AZPIRE · FOUNDED 2019</text>
  </g>

  <text x="96" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="72"
        fill="${INK}">A room of professionals</text>
  <text x="96" y="352" font-family="Georgia, 'Times New Roman', serif" font-size="72"
        fill="${INK}">who send each other work.</text>

  <text x="96" y="432" font-family="Helvetica, Arial, sans-serif" font-size="28"
        fill="${INK_700}">Pollachi, at the foot of the Western Ghats.</text>

  <!-- ridgeline + rising point along the base -->
  <circle cx="1044" cy="470" r="40" fill="${RED}"/>
  <path fill="none" stroke="${BLUE}" stroke-width="2.5" stroke-linecap="round"
        d="M0 512 C 150 500 250 470 360 482 C 470 494 540 452 660 464 C 800 478 900 452 1020 470 C 1090 480 1150 496 1200 500"/>
  <path fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
        d="M96 560 L172 470 L226 520 L300 452 L356 512"/>
</svg>`;

// ── ICO packer ────────────────────────────────────────────────────────────────
// ICO can embed PNGs directly (every current browser and every link crawler that
// matters reads it). Header, one directory entry per size, then the PNG bytes.
function packIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const bodies = [];
  pngs.forEach(({ size, data }, i) => {
    const e = 16 * i;
    dir.writeUInt8(size >= 256 ? 0 : size, e + 0); // width  (0 = 256)
    dir.writeUInt8(size >= 256 ? 0 : size, e + 1); // height
    dir.writeUInt8(0, e + 2); // colours in palette
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // colour planes
    dir.writeUInt16LE(32, e + 6); // bits per pixel
    dir.writeUInt32LE(data.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += data.length;
    bodies.push(data);
  });

  return Buffer.concat([header, dir, ...bodies]);
}

const mark = Buffer.from(markSvg);
const og = Buffer.from(ogSvg);

// icon.svg — vector, verbatim
writeFileSync('public/icon.svg', markSvg);

// favicon.ico — 16/32/48
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map(async (size) => ({
    size,
    data: await sharp(mark).resize(size, size).png().toBuffer(),
  })),
);
writeFileSync('public/favicon.ico', packIco(icoPngs));

// apple-icon.png — 180, no transparency (iOS adds its own rounding)
await sharp(mark).resize(180, 180).png().toFile('public/apple-icon.png');

// og-default.png — 1200×630
await sharp(og).resize(1200, 630).png().toFile('public/images/og-default.png');

console.log('brand assets written: icon.svg, favicon.ico, apple-icon.png, images/og-default.png');
