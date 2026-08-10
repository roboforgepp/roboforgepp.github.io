import { getCollection, type CollectionEntry } from 'astro:content';

import { PROJECT_STATUSES, PROJECT_VISUALS } from '../content.config';

export type Project = CollectionEntry<'projects'>;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type VisualKey = (typeof PROJECT_VISUALS)[number];

/** Etykiety i kolory statusów — jedno miejsce dla listy, karty i podstrony. */
export const STATUS_META: Record<
  ProjectStatus,
  { label: string; dot: string; chip: string }
> = {
  planowany: {
    label: 'Planowany',
    dot: 'bg-gray-400',
    chip: 'bg-gray-100 text-gray-600',
  },
  'w-rozwoju': {
    label: 'W rozwoju',
    dot: 'bg-brand-500',
    chip: 'bg-brand-50 text-brand-700',
  },
  zrealizowany: {
    label: 'Zrealizowany',
    dot: 'bg-emerald-500',
    chip: 'bg-emerald-50 text-emerald-700',
  },
  wstrzymany: {
    label: 'Wstrzymany',
    dot: 'bg-amber-500',
    chip: 'bg-amber-50 text-amber-700',
  },
};

/** Kolejność, w jakiej statusy pokazujemy w filtrze na /projects. */
export const STATUS_ORDER: ProjectStatus[] = [
  'w-rozwoju',
  'planowany',
  'zrealizowany',
  'wstrzymany',
];

/** Wszystkie projekty poza szkicami, w kolejności ustawionej polem `order`. */
export async function getPublishedProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'pl'),
  );
}

/** Trzy najnowsze na stronę główną: przypięte najpierw, potem po dacie malejąco. */
export async function getLatestProjects(limit = 3): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all
    .sort(
      (a, b) =>
        Number(b.data.featured) - Number(a.data.featured) ||
        b.data.date.getTime() - a.data.date.getTime(),
    )
    .slice(0, limit);
}

/**
 * Klucz podstawy dla `RobotAssembly`, wyprowadzony z pola `visual`. Dzięki temu
 * przełącznik na stronie głównej nie ma własnej listy podstaw — dodanie czwartej
 * wystarczy opisać w pliku `.md`.
 */
const BASE_MODULE: Partial<Record<VisualKey, 'wheels' | 'legs' | 'tracks'>> = {
  robot: 'wheels',
  'robot-legs': 'legs',
  'robot-tracks': 'tracks',
};

/** Podstawy platformy do przełącznika na stronie głównej — prosto z kolekcji. */
export async function getBases() {
  const projects = await getPublishedProjects();
  return projects
    .filter((project) => project.data.category === 'Podstawa')
    .map((project, index) => ({
      project,
      module: BASE_MODULE[project.data.visual] ?? 'wheels',
      number: String(index + 1).padStart(2, '0'),
    }));
}

/** Projekty pogrupowane w kategorie, w kolejności pierwszego wystąpienia. */
export function groupByCategory(projects: Project[]): [string, Project[]][] {
  const groups = new Map<string, Project[]>();
  for (const project of projects) {
    const bucket = groups.get(project.data.category) ?? [];
    bucket.push(project);
    groups.set(project.data.category, bucket);
  }
  return [...groups];
}
