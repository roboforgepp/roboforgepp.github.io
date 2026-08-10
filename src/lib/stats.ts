import { getCollection } from 'astro:content';

import { SITE, TEAM_SECTIONS } from '../data/site';
import { getPublishedProjects } from './projects';

/**
 * Statystyki liczone przy buildzie. Dodanie pliku projektu podbija licznik samo —
 * nikt nie musi pamiętać o poprawieniu liczby na stronie głównej.
 */
export async function getStats() {
  const projects = await getPublishedProjects();
  const partners = await getCollection('partners', ({ data }) => data.confirmed);

  return {
    projects: projects.length,
    completed: projects.filter((p) => p.data.status === 'zrealizowany').length,
    inProgress: projects.filter((p) => p.data.status === 'w-rozwoju').length,
    bases: projects.filter((p) => p.data.category === 'Podstawa').length,
    partners: partners.length,
    sections: TEAM_SECTIONS.length,
    years: Math.max(1, new Date().getFullYear() - SITE.foundedYear),
  };
}
