# RoboForge — plan realizacji strony

Dokument roboczy Sekcji Informatyki. Opisuje drogę od obecnego szkieletu (`f7bb8fe`)
do strony gotowej na treść: komponenty wielokrotnego użytku, projekty jako osobne pliki
sklejane przy buildzie, automatyczne statystyki i placeholdery wszędzie tam, gdzie
czekamy na materiały.

Szablon `roboforge- kuźnia zajebistości/` traktujemy jako **kierunek wizualny i źródło
struktury informacji**, nie jako kod do przepisania.

---

## 1. Stan faktyczny

Repo ma działający szkielet w Astro 7 + Tailwind 4:

- **Paleta marki już jest** — `@theme` w `src/styles/global.css` definiuje skalę
  `brand-50…950` z `brand-600: #0066ff`, czyli dokładnie niebieskim z szablonu.
- **Komponenty**: `Button`, `Section`, `SocialIcon`, `TeamSection`, `Header`, `Footer`.
- **Strony**: `index` (jedyna z treścią), `team` (5 sekcji z nazwiskami), `projects`,
  `partners`, `contact` — trzy ostatnie to same nagłówki.
- **Favicon gotowy** — `public/favicon.svg` + `.ico` to autorski znak RoboForge, logo
  w nagłówku to `robokop_np_N.svg`. Punkt D1 z poprzedniej wersji planu odpada.
- **Prawdziwe sociale**: GitHub, Facebook, Instagram (`src/pages/index.astro:12-25`).

To zmienia jedną z wcześniejszych rekomendacji — patrz §3.1.

---

## 2. Błędy i braki do naprawy

### 2.1 Blokujące

| #  | Gdzie                               | Problem                                                                                                                                                                                                                                                                   |
|----|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| B1 | `src/layouts/Layout.astro:8`        | `<html lang="en">` na polskiej stronie. Psuje czytniki ekranu, dzielenie wyrazów i SEO.                                                                                                                                                                                   |
| B2 | `src/layouts/Layout.astro:14`       | Tytuł `Robo Forge` zaszyty dla **wszystkich** stron. Brak `description`, OG, canonical. Każda podstrona ma dziś ten sam tytuł w wynikach wyszukiwania.                                                                                                                    |
| B3 | `src/pages/index.astro:131`         | `<Footer />` jest renderowany **tylko na stronie głównej**. Cztery pozostałe strony są bez stopki. Stopka należy do `Layout`.                                                                                                                                             |
| B4 | `src/components/Header.astro:14-40` | **Brak menu mobilnego.** Logo `h-28` + cztery linki `gap-10` w jednym `flex` bez breakpointów — na telefonie się nie mieści.                                                                                                                                              |
| B5 | `src/layouts/Layout.astro:16`       | `class="mx-auto max-w-5xl"` na `<body>`. Brak poziomego paddingu (treść dotyka krawędzi < 1024 px) i **niemożliwe są sekcje full-bleed** — a ciemny hero z §4 takiej wymaga. Kontener przenieść z `body` do komponentu `<Container>`.                                     |

### 2.2 Treść i literówki (to jest „literówki, PP z dużej" od Antoniego)

| Gdzie               | Jest                                                   | Ma być                                                                                                                                                          |
|---------------------|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `index.astro:59`    | „studentów **politechniki poznańskiej**"               | „**Politechniki Poznańskiej**"                                                                                                                                  |
| `index.astro:60`    | „modularna konstrukcja **ktrą**"                       | „**którą**"                                                                                                                                                     |
| `team.astro:26`     | „Kowale **informatyczne**"                             | „Kowale **informatycy**" (reszta: mechanicy, elektronicy)                                                                                                       |
| `team.astro:30`     | „**Domimnik** Ziemiański"                              | „**Dominik** Ziemiański"                                                                                                                                        |
| `index.astro:29-42` | podstawy: kołowa, krocząca, **moduł transportowy**     | kołowa, krocząca, **gąsienicowa** — Antoni wprost: „mamy 3 podstawy i nadstawy: krocząca, kołowa, gąsienicowa". Moduł transportowy to *nadstawa*, nie podstawa. |
| `index.astro:44`    | `["Partner A", "Partner B", "Partner C", "Partner D"]` | Botland, MabRobotics, FreshDesign, PCSS                                                                                                                         |

### 2.3 Drobne

- `src/assets/astro.svg` i `background.svg` — pozostałości startera, do usunięcia.
- `Section.astro` wymaga `href` i `cta` — sekcja bez przycisku jest niemożliwa.
  Zrobić opcjonalne.
- Brak `robots.txt` i sitemapy.
- `SocialIcon` nie ma TikToka, a Antoni prosił o dodanie („tu do sociali mamy jeszcze tt").

---

## 3. Decyzje (zamknięte)

### 3.1 Tailwind **zostaje** — zmiana wobec poprzedniej wersji planu

Poprzednia rekomendacja („wywalić Tailwinda") opierała się na nieaktualnym repo, w którym
był goły starter, a jedynym kodem był autorski CSS szablonu. Teraz sytuacja jest odwrotna:
**cała istniejąca praca jest w Tailwindzie**, paleta marki siedzi w `@theme`, a komponenty
są napisane porządnie. Wyrzucanie tego byłoby regresem — i masz rację co do responsywności,
w Tailwindzie pisze się ją szybciej.

Konsekwencja: system designu z szablonu przenosimy **do `@theme`**, nie do osobnego CSS-a.

```css
@theme {
  /* skala brand-* zostaje bez zmian */
  --color-ink:      #07090d;   /* ciemne tło sekcji */
  --color-ink-2:    #11151d;
  --color-paper:    #f7f8fa;   /* jasne tło sekcji */
  --font-sans:      "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --ease-forge:     cubic-bezier(0.22, 0.8, 0.2, 1);
  --radius-card:    18px;
}
```

Font: `npm i @fontsource-variable/inter` i import w `Layout` — bez CDN, bez FOUT.
(W szablonie Inter był zadeklarowany, ale nigdy nie ładowany — stąd uwaga Bartka o czcionkach.)

### 3.2 Pozostałe

| Decyzja           | Ustalenie                                          |
|-------------------|----------------------------------------------------|
| Domena            | **roboforgepp.pl** — obecna konfiguracja działa, nie ruszamy |
| Formularze        | **`mailto:`** — bez backendu, zgodnie z ustaleniem |
| Treść             | **placeholdery** na teraz, patrz §6                |
| Favicon           | gotowy, nic nie robimy                             |
| Kierunek wizualny | **pośredni**, patrz §4                             |

---

## 4. Kierunek wizualny

Bierzemy z szablonu paletę, typografię, animowane wizualizacje i strukturę sekcji —
zachowując czysty układ i komponenty, które już są.

- **Hero** ciemny (`bg-ink`), full-bleed, duża typografia w duchu „Witajcie w naszej kuźni",
  iskry na `<canvas>` (port z `main.js`, ~40 linii, respektuje `prefers-reduced-motion`).
- **Sekcje** naprzemiennie jasne (`bg-white` / `bg-paper`) — czyli obecny `Section.astro`
  po rozszerzeniu o wariant tła.
- **Wizualizacje projektów** — robot, ramię, LiDAR, panel UI, tiara: port z CSS szablonu
  na Tailwind + `@keyframes`. To one załatwiają uwagę Antoniego, żeby „coś się działo
  i ruszało", zanim będą prawdziwe rendery.
- **Animacje wejścia** — CSS + `IntersectionObserver` (~30 linii), **bez GSAP**.
  Zero dodatkowego JS-u w bundlu zamiast ~70 kB z CDN.

---

## 5. Docelowa struktura

```
src/
  components/
    layout/    Header.astro  MobileNav.astro  Footer.astro  Container.astro  Seo.astro
    ui/        Button.astro  Section.astro  SectionHeading.astro  Card.astro
               Tag.astro  Stat.astro  StatsGrid.astro  SocialIcon.astro
               PlaceholderBox.astro         ← wspólny placeholder na zdjęcia/rendery
    visuals/   ProjectVisual.astro          ← dispatcher po kluczu `visual`
               RobotAssembly.astro  ArmVisual.astro  LidarDiagram.astro
               UiVisual.astro  HatVisual.astro
    project/   ProjectCard.astro  ProjectRow.astro  ProjectStatus.astro
    partners/  PartnerTile.astro  PartnerGrid.astro
    team/      TeamSection.astro
  content/
    projects/  _TEMPLATE.md  README.md  *.md      ← JEDEN PLIK = JEDEN PROJEKT
    partners/  *.md
  content.config.ts
  data/        site.ts        ← nawigacja, kontakty, sociale, rok założenia
  layouts/     Layout.astro  ProjectLayout.astro
  lib/         projects.ts  stats.ts
  pages/       index.astro  projects/index.astro  projects/[...slug].astro
               team.astro  partners.astro  media.astro  contact.astro  404.astro
  styles/      global.css    ← @theme + warstwa bazowa
public/        favicon.*  robots.txt  downloads/
```

Nawigacja rośnie o **`/media`** (audycja Spotify, sociale, pakiet logo — zadania D7/D8).
`/team` zostaje jako „Zespół" i pełni rolę „O nas" z szablonu.

---

## 6. Placeholdery — konwencja

Skoro treść przyjdzie później, placeholder musi być **widoczny w pracy i niewidoczny
dla odwiedzającego**, oraz łatwy do odnalezienia.

1. **Frontmatter** — pole `placeholder: true` w pliku projektu/partnera.
2. **Render** — `ProjectStatus` dokleja chip „treść robocza" **tylko** przy
   `import.meta.env.DEV`. Produkcja jest czysta.
3. **Obrazy** — `<PlaceholderBox>`: ramka z etykietą („Render platformy", „Zdjęcie zespołu"),
   dokładnie jak dzisiejszy blok `aspect-video` w `index.astro:124-128`, tylko jako komponent.
   Gdzie się da, zamiast pustej ramki idzie animowana wizualizacja z §4.
4. **Tekst** — sensownie brzmiące zdania po polsku, nie lorem ipsum. Strona ma być
   pokazywalna zarządowi przed dostarczeniem treści.
5. **Kontrola** — `npm run check:content` (grep po `placeholder: true`) wypisuje listę
   tego, co czeka na materiały. Do wklejenia na Discorda jako lista braków.

---

## 7. System projektów — rdzeń zadania

### 7.1 Schemat — `src/content.config.ts`

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),                 // 1–2 zdania na kartę
      category: z.string(),                // "Podstawa", "Nadstawa", "Percepcja"…
      status: z.enum(['planowany', 'w-rozwoju', 'zrealizowany', 'wstrzymany']),
      date: z.coerce.date(),               // decyduje o „3 najnowsze"
      featured: z.boolean().default(false),// przypięcie na stronę główną
      order: z.number().default(100),      // kolejność na /projects
      tags: z.array(z.string()).default([]),
      visual: z.enum(['robot', 'arm', 'lidar', 'ui', 'hat']).default('robot'),
      cover: image().optional(),           // render/zdjęcie — nadpisuje `visual`
      downloads: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      placeholder: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects /* , partners */ };
```

Prefiks `_` wyklucza plik z builda — `_TEMPLATE.md` jest bezpieczny.

> Szkic opiera się na Content Layer API (Astro 5+). Repo jest na Astro 7 — przy
> implementacji zweryfikować sygnatury `glob()` / `render()` w
> [dokumentacji](https://docs.astro.build/en/guides/content-collections/).

**Odpowiedź na pytanie Bartka** („czy będzie podstrona, żeby ręcznie zmieniać te stany,
czy trzeba w kodzie?"): status to jedna linia frontmattera, edytowalna z poziomu
github.com bez klonowania repo. Instrukcja ląduje w `src/content/projects/README.md`
i jest linkowana z głównego README — tak jak prosił.

### 7.2 Zapytania — `src/lib/projects.ts`

```ts
export async function getPublishedProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Trzy najnowsze na stronę główną: przypięte najpierw, potem po dacie malejąco. */
export async function getLatestProjects(limit = 3) {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all
    .sort((a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      b.data.date.getTime() - a.data.date.getTime())
    .slice(0, limit);
}
```

### 7.3 Strony

- `/projects` — pełna lista z `<ProjectRow>`, filtr po statusie.
- `/projects/[...slug]` — **nowa podstrona projektu**: opis z body markdown, wizualizacja,
  tagi, pliki do pobrania. To wypełnia zakładkę Projekty, o co prosił Antoni.
- `/` — sekcja Projekty zamiast dzisiejszej tablicy `projects` (`index.astro:29-42`)
  renderuje `getLatestProjects(3)`.

### 7.4 Zestaw startowy plików

Dziewięć projektów z placeholderową treścią, zgodnie z tym, co opisał Antoni:

```
platforma-rf-01.md          category: Platforma   status: w-rozwoju      order: 1
podstawa-kolowa.md          category: Podstawa    status: w-rozwoju      order: 10
podstawa-kroczaca.md        category: Podstawa    status: planowany      order: 20
podstawa-gasienicowa.md     category: Podstawa    status: planowany      order: 30
nadstawa-infotainment.md    category: Nadstawa    status: planowany      order: 40
nadstawa-ramie.md           category: Nadstawa    status: planowany      order: 50
nadstawa-tracker.md         category: Nadstawa    status: planowany      order: 60
nadstawa-transportowa.md    category: Nadstawa    status: planowany      order: 70
tiara-przydzialu.md         category: Projekt pokazowy  status: zrealizowany  order: 80
```

**Platforma RF-01** to rdzeń, do którego odwołują się wszystkie pozostałe wpisy
(„wspólny interfejs montażowy"). Nie jest `featured` — na stronie głównej ma własną
sekcję flagową, więc na kafelkach „najnowsze" byłaby drugi raz.

**Nadstawa transportowa** pochodzi z szablonu Kamila, gdzie figurowała błędnie jako
trzecia *podstawa*. Antoni wymienił trzy nadstawy (infotainment, ramię, tracker), więc
jeśli skrzynia ładunkowa nie jest realnym planem — wystarczy skasować plik.

Tiara jest ukończona („mamy tiarę przydziału z HP już zrobioną") — brakuje tylko zdjęć
od Julii i Tomasza, więc idzie z `placeholder: true`.

Pole `order` grupuje listę `/projects` po kategoriach: platforma, podstawy, nadstawy,
projekt pokazowy. Odstępy co 10 zostawiają miejsce na wstawki bez przenumerowywania.

### 7.5 Statystyki liczone przy buildzie — `src/lib/stats.ts`

```ts
export async function getStats() {
  const projects = await getPublishedProjects();
  const partners = await getCollection('partners', ({ data }) => data.confirmed);

  return {
    projects:   projects.length,
    completed:  projects.filter((p) => p.data.status === 'zrealizowany').length,
    inProgress: projects.filter((p) => p.data.status === 'w-rozwoju').length,
    partners:   partners.length,
    sections:   TEAM_SECTIONS.length,
    years:      new Date().getFullYear() - SITE.foundedYear,
  };
}
```

`<StatsGrid>` przyjmuje kafelki, gdzie wartość to klucz ze `getStats()` **albo** literał —
żeby dało się zostawić efektowne `∞` z szablonu obok policzonych liczb.

---

## 8. Feedback z Discorda → zadania

| #   | Zgłosił | Zadanie                                                     | Status                                                                      |
|-----|---------|-------------------------------------------------------------|-----------------------------------------------------------------------------|
| D1  | Antoni  | Logo na karcie przeglądarki                                 | ✅ zrobione (`public/favicon.svg`)                                           |
| D2  | Antoni  | Literówki, „PP z dużej"                                     | §2.2 — znalezione, konkretne                                                |
| D3  | Antoni  | 3 podstawy: kołowa, krocząca, **gąsienicowa** + nadstawy    | §2.2, §7.4                                                                  |
| D4  | Antoni  | Maile kontaktowe (`roboforgepp@gmail.com`, Antoni, Bartosz) | `/contact` jest pusty — do dodania                                          |
| D5  | Antoni  | Partnerzy: Botland, MabRobotics, FreshDesign, PCSS          | PCSS jako `confirmed: false` do potwierdzenia                               |
| D6  | Bartosz | Partnerzy jako **kafelki z logo**, szczegóły po kliknięciu  | `<PartnerGrid>` + `<dialog>`; skaluje się przy rosnącej liczbie             |
| D7  | Antoni  | **TikTok** w socialach + realne linki                       | ikona do `SocialIcon`; **linki od Dominika**                                |
| D8  | Antoni  | Audycja Spotify jako „backdrop"                             | osadzony odtwarzacz na `/media` + wzmianka o comiesięcznym cyklu            |
| D9  | Antoni  | Tiara Przydziału — zrealizowana                             | §7.4; **zdjęcia od Julii/Tomasza**                                          |
| D10 | Antoni  | Kolorystyka bez ustalonego HEX-a                            | zamknięta w `@theme`; zmiana palety = kilka linii                           |
| D11 | Bartosz | Czcionki i układ bloków                                     | Inter self-hosted (§3.1) + B5/B6                                            |
| D12 | Antoni  | Więcej treści i ruchu w Projektach                          | §4 (wizualizacje) + §7.3 (podstrony)                                        |
| D13 | Bartosz | Pliki STEP                                                  | `public/downloads/` + pole `downloads`; **pliki od Bartka**                 |
| D14 | Kamil   | Admin panel / aktualności                                   | faza 5; najpierw edycja `.md` przez interfejs GitHuba — zero infrastruktury |

---

## 9. Fazy

**Faza 0 — fundament** ✅
B1–B5, `@theme` z §3.1, Inter, `Container`, `Seo`, `Footer` do `Layout`, menu mobilne,
`site.ts`, usunięcie resztek startera, `robots.txt` + `@astrojs/sitemap`.

**Faza 1 — biblioteka komponentów** ✅
`Section` z wariantami tła, `SectionHeading`, `Card`, `Stat`, `PlaceholderBox`,
`Tag`, hero z canvasem, `IntersectionObserver` do animacji wejścia.

**Faza 2 — system projektów** ✅ ← *rdzeń zadania*
`content.config.ts`, 9 plików projektów, `lib/projects.ts`, `lib/stats.ts`, `/projects`
z filtrem statusów, `/projects/[...slug]`, trzy najnowsze na home, `StatsGrid`,
`_TEMPLATE.md` + README obu kolekcji.

**Faza 3 — pozostałe strony** ✅
Kolekcja `partners` + kafelki z `<dialog>` (D5, D6), `/media` (D7, D8),
`/contact` z `mailto:` (D4), `/team` po korekcie, `404`.

**Faza 4 — dopięcie** ← *tu jesteśmy*
Przegląd responsywności na realnych szerokościach i urządzeniach, a11y (focus,
kontrast, `aria`), Lighthouse. Podmiana placeholderów w miarę spływania materiałów
— lista z `npm run check:content` (obecnie **14 pozycji**) idzie na Discorda.

**Faza 5 — później**
Aktualności, ścieżka edycji dla nietechnicznych (D14), STEP i ewentualny podgląd 3D,
prawdziwe zdjęcia i rendery w miejsce placeholderów.

### Znane kompromisy

- **Kanoniczne adresy wskazują `roboforgepp.github.io`**, bo `site` w `astro.config.mjs`
  zostaje bez zmian (decyzja z §3.2). Dotyczy `<link rel="canonical">`, OG i sitemapy —
  nie wpływa na działanie strony, tylko na to, co zobaczy Google. Zmiana to jedna linia,
  gdy będzie potrzeba.
- **Kafelki socialowe na `/media` mają style inline zamiast `<Card>`** — potrzebują
  stanu „profil bez linku" i układu poziomego, których `Card` nie modeluje. Świadomie
  zostawione, żeby nie naginać komponentu do jednego przypadku.
- **`visual: robot` dla nadstawy transportowej** — wizualizacja pokazuje platformę
  z nadstawą, ale nie skrzynię ładunkową. Kandydat na osobny klucz `cargo`, gdy będzie
  czas albo render.

---

## 10. Czego brakuje z zewnątrz

Nic z tego nie blokuje kodu — do czasu dostarczenia jadą placeholdery, które podmienia się
bez ruszania układu strony.

- **Dominik** — linki Instagram/TikTok, logotypy partnerów, docelowa paleta do zatwierdzenia.
- **Julia / Tomasz** — zdjęcia Tiary Przydziału.
- **Bartosz** — pliki STEP robota i ramienia.
- **Antoni** — opisy projektów (proponował call; warto go zrobić przed końcem Fazy 2)
  oraz wskazanie, którego zrzutu ekranu dotyczyła uwaga o literówkach.
- **Zarząd** — potwierdzenie PCSS.
