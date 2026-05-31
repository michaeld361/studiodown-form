import { mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');
const src = join(dist, 'index.html');

const routes = ['darlings', 'bouteille', 'yellowtail'];

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(src, join(dir, 'index.html'));
  console.log(`  ✓ /${route}/index.html`);
}

console.log(`\nCopied index.html to ${routes.length} route directories.\n`);
