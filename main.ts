import { mkdir } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const artwork = readFileSync(new URL('./entry.png', import.meta.url));

await mkdir(targetDir, { recursive: true });
writeFileSync(join(targetDir, 'entry.png'), artwork);