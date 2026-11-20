import { mkdir } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const artwork = readFileSync(new URL('./entry.png', import.meta.url));

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
if (!artwork.subarray(0, 8).equals(pngSignature)) {
  throw new Error('entry.png must be a complete PNG image.');
}
if (artwork.byteLength < 24) {
  throw new Error('entry.png is too short to contain its PNG dimensions.');
}
if (artwork.byteLength > 1_048_576) {
  throw new Error('entry.png must be no larger than 1 MiB.');
}

const width = artwork.readUInt32BE(16);
const height = artwork.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error('entry.png must be no larger than 1024 by 1024 pixels.');
}

await mkdir(targetDir, { recursive: true });
writeFileSync(join(targetDir, 'entry.png'), artwork);
