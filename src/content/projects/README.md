# Jak dodać albo zmienić projekt

Każdy projekt to **jeden plik `.md` w tym katalogu**. Nazwa pliku staje się
adresem podstrony: `podstawa-kolowa.md` → `roboforgepp.pl/projects/podstawa-kolowa`.

Nie trzeba klonować repozytorium ani znać się na programowaniu — wszystko da się
zrobić przez stronę github.com.

## Zmiana statusu projektu (planowany → w rozwoju → zrealizowany)

1. Wejdź na GitHuba do katalogu `src/content/projects/`.
2. Kliknij plik projektu, potem ikonę ołówka (**Edit this file**).
3. W górnej części pliku, między liniami `---`, znajdź linię `status:`.
4. Wpisz jedną z czterech wartości: `planowany`, `w-rozwoju`, `zrealizowany`,
   `wstrzymany`.
5. Na dole kliknij **Commit changes**. Strona przebuduje się sama w 1–2 minuty.

## Dodanie nowego projektu

1. Otwórz `_TEMPLATE.md`, skopiuj całą zawartość.
2. W katalogu `src/content/projects/` kliknij **Add file → Create new file**.
3. Nazwij plik, np. `chwytak-magnetyczny.md` (małe litery, myślniki zamiast spacji).
4. Wklej szablon, wypełnij pola i treść pod spodem.
5. **Commit changes**.

## Pola nagłówka

| Pole          | Znaczenie                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------|
| `title`       | Nazwa projektu — nagłówek karty i podstrony.                                                   |
| `summary`     | 1–2 zdania na kafelek i do wyników wyszukiwania.                                                |
| `category`    | Grupa na liście: `Podstawa`, `Nadstawa`, `Projekt pokazowy` lub własna.                        |
| `status`      | `planowany`, `w-rozwoju`, `zrealizowany`, `wstrzymany`.                                         |
| `date`        | Data startu prac. Decyduje, które projekty trafiają do „najnowszych" na stronie głównej.        |
| `featured`    | `true` przypina projekt na stronie głównej niezależnie od daty.                                 |
| `order`       | Kolejność na `/projects`. Mniejsza liczba = wyżej.                                              |
| `tags`        | Lista haseł pod opisem, np. `- ROS 2`.                                                          |
| `visual`      | Animowana grafika, gdy nie ma jeszcze zdjęcia. Wartości niżej.                                  |
| `cover`       | Ścieżka do zdjęcia lub renderu względem tego pliku. Gdy jest — zastępuje `visual`.               |
| `coverAlt`    | Opis zdjęcia dla czytników ekranu. Wymagany, gdy jest `cover`.                                  |
| `downloads`   | Pliki do pobrania (STEP, PDF). Wrzuć plik do `public/downloads/` i podaj `href: /downloads/…`.  |
| `placeholder` | `true`, dopóki treść jest robocza. W trybie deweloperskim widać wtedy adnotację.                 |
| `draft`       | `true` = projekt nie pojawia się na stronie w ogóle.                                             |

### Dostępne wartości `visual`

| Wartość        | Co rysuje                                    |
|----------------|----------------------------------------------|
| `robot`        | platforma na kołach                          |
| `robot-legs`   | platforma krocząca                           |
| `robot-tracks` | platforma gąsienicowa                        |
| `arm`          | ramię robotyczne z chwytakiem                |
| `lidar`        | skaner otoczenia / LiDAR                     |
| `ui`           | panel interfejsu z telemetrią                |
| `hat`          | Tiara Przydziału                             |

## Zdjęcia i rendery

Wrzuć plik do podkatalogu `zdjecia/` obok pliku projektu i wskaż go w `cover`:

```yaml
cover: ./zdjecia/podstawa-kolowa.jpg
coverAlt: Podstawa kołowa na stanowisku testowym
```

Astro sam przeskaluje i skompresuje obraz przy buildzie.

## Pliki STEP i inne do pobrania

Wrzuć plik do `public/downloads/` w głównym katalogu repozytorium, a potem:

```yaml
downloads:
  - label: Model STEP podstawy
    href: /downloads/podstawa-kolowa.step
```

## Co jeszcze czeka na materiały

Uruchom w katalogu projektu:

```bash
npm run check:content
```

Wypisze listę wszystkich wpisów z `placeholder: true` — gotową do wklejenia na Discorda.
