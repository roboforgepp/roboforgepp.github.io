# Robo Forge strona koła

# Zasady

Najważniejsza zasada: Na main lecą tylko commity które są gotowe i działają. **Masz coś niepełnego robisz branch!!!**

# Development

Jako że jest to js-owy framework to wymagany jest node na komputerze: [node](https://nodejs.org/en/download/current)

Po clonie należy zainstalować wszystkie zależnośći
```bash
npm install
```

Do rozpoczęcia pracy włączamy serwer deleoperski
```bash
npm run dev
```

Używany framework: [astro](https://astro.build/)

Dodatki: [tailwindcss](https://tailwindcss.com/)

Pozostałe komendy:

```bash
npm run build          # build produkcyjny do dist/
npm run check          # kontrola typów i szablonów
npm run check:content  # lista treści czekających na materiały (do wklejenia na Discorda)
```

# Treść strony

**Projekty i partnerzy nie siedzą w kodzie.** Każdy projekt to jeden plik `.md`
w [`src/content/projects/`](src/content/projects/), a każdy partner — w
[`src/content/partners/`](src/content/partners/).

Zmiana statusu projektu (`planowany` → `w-rozwoju` → `zrealizowany`) to poprawienie
jednej linii, którą da się edytować bezpośrednio na github.com, bez klonowania repo.

**Instrukcja krok po kroku: [src/content/projects/README.md](src/content/projects/README.md)**

Pozostałe miejsca na treść:

| Co                                        | Gdzie                        |
|-------------------------------------------|------------------------------|
| Nawigacja, maile kontaktowe, sociale      | `src/data/site.ts`           |
| Sekcje koła i przewodniczący              | `src/data/site.ts`           |
| Paleta kolorów, czcionka, animacje        | `src/styles/global.css`      |
| Pliki do pobrania (STEP, PDF)             | `public/downloads/`          |

# Deploy

Odpalenie nowej wersji strony jest automatyczne po nowym commicie na branchu **main**.

Uruchomienie zajmuje kilka sekund i tak samo po skończeniu deploy CND potrzebuje chwili żeby zaciągnąć nową wersję. Jakby komuś nie działała strona po 1-2 min to należy odświerzyć cache przeglądarki (Ctrl + Shift + R)

Strona jest hostowana na github pages więc workflow jest banalny, zmiany w tym powinny robić osoby które wiedzą o co chodzi, więcej dokumentacji nie jest konieczne.
