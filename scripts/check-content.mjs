#!/usr/bin/env node
/**
 * Lista wszystkiego, co czeka na materiały z zewnątrz.
 * Uruchomienie: `npm run check:content`
 *
 * Wypisuje wpisy z `placeholder: true` oraz braki widoczne w `src/data/site.ts`
 * (np. social bez linku). Wynik jest w formacie gotowym do wklejenia na Discorda.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONTENT_DIR = new URL('../src/content/', import.meta.url).pathname;
const SITE_FILE = new URL('../src/data/site.ts', import.meta.url).pathname;

/** Prosty odczyt pojedynczego pola z frontmattera — bez ciągnięcia parsera YAML. */
function field(frontmatter, name) {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : undefined;
}

async function collect(collection) {
  const dir = join(CONTENT_DIR, collection);
  let files;
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }

  const entries = [];
  for (const file of files) {
    if (!file.endsWith('.md') || file.startsWith('_') || file === 'README.md') continue;

    const raw = await readFile(join(dir, file), 'utf8');
    const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    if (!frontmatter) continue;

    if (field(frontmatter, 'placeholder') !== 'true') continue;

    entries.push({
      file: `src/content/${collection}/${file}`,
      title: field(frontmatter, 'title') ?? field(frontmatter, 'name') ?? file,
      status: field(frontmatter, 'status'),
      confirmed: field(frontmatter, 'confirmed'),
      hasCover: /^(cover|logo):/m.test(frontmatter),
      downloads: field(frontmatter, 'downloads'),
    });
  }
  return entries;
}

const projects = await collect('projects');
const partners = await collect('partners');

const site = await readFile(SITE_FILE, 'utf8');
const missingSocials = [...site.matchAll(/label:\s*"([^"]+)",\s*href:\s*null/g)].map(
  (match) => match[1],
);

const lines = ['**RoboForge — czego brakuje na stronie**', ''];

if (projects.length) {
  lines.push(`__Projekty z treścią roboczą (${projects.length})__`);
  for (const entry of projects) {
    const gaps = [];
    if (!entry.hasCover) gaps.push('render/zdjęcie');
    if (entry.downloads === '[]') gaps.push('pliki STEP/PDF');
    gaps.push('opis do potwierdzenia');
    lines.push(`• ${entry.title} (${entry.status}) — ${gaps.join(', ')}`);
  }
  lines.push('');
}

if (partners.length) {
  lines.push(`__Partnerzy z treścią roboczą (${partners.length})__`);
  for (const entry of partners) {
    const gaps = [];
    if (!entry.hasCover) gaps.push('logotyp');
    if (entry.confirmed === 'false') gaps.push('potwierdzenie współpracy');
    gaps.push('opis do potwierdzenia');
    lines.push(`• ${entry.title} — ${gaps.join(', ')}`);
  }
  lines.push('');
}

if (missingSocials.length) {
  lines.push('__Sociale bez linku__');
  for (const label of missingSocials) lines.push(`• ${label} — adres profilu`);
  lines.push('');
}

lines.push('__Poza treścią__');
lines.push('• Zdjęcie zespołu — sekcja promocji');
lines.push('• Pakiet materiałów dla mediów (logotypy, zdjęcia) — sekcja promocji');
lines.push('• Rok założenia koła w src/data/site.ts — do potwierdzenia');

console.log(lines.join('\n'));

const total = projects.length + partners.length + missingSocials.length;
console.log(`\n${total} pozycji czeka na materiały.`);
