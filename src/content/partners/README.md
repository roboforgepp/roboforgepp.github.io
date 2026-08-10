# Jak dodać albo zmienić partnera

Każdy partner to **jeden plik `.md` w tym katalogu**. Kafelki na stronie
`/partners` i lista na stronie głównej biorą się stąd — nie trzeba nic
dopisywać w kodzie.

Wszystko da się zrobić przez stronę github.com, bez klonowania repozytorium.

## Dodanie partnera

1. Otwórz `_TEMPLATE.md` i skopiuj całą zawartość.
2. W tym katalogu kliknij **Add file → Create new file**.
3. Nazwij plik po firmie, np. `mabrobotics.md` (małe litery, myślniki zamiast spacji).
4. Wklej szablon, wypełnij pola i opis pod spodem.
5. **Commit changes**. Strona przebuduje się sama w 1–2 minuty.

## Potwierdzenie współpracy

Dopóki rozmowy trwają, ustaw `confirmed: false`. Kafelek zostaje widoczny,
ale dostaje adnotację „w rozmowach" i **nie jest liczony jako potwierdzony partner**
w statystykach (`getStats()`). Po podpisaniu wystarczy zmienić tę jedną linię na `true`.

## Pola nagłówka

| Pole          | Znaczenie                                                                     |
|---------------|-------------------------------------------------------------------------------|
| `name`        | Nazwa firmy — nagłówek kafelka i okna ze szczegółami.                          |
| `summary`     | Jedno zdanie na kafelek: co konkretnie dzięki temu partnerowi zyskujemy.       |
| `url`         | Adres strony partnera. Usuń linię, jeśli nie ma.                               |
| `logo`        | Ścieżka do logotypu względem tego pliku. Bez niego kafelek pokazuje nazwę.     |
| `order`       | Kolejność w siatce. Mniejsza liczba = wcześniej.                               |
| `confirmed`   | `false` = rozmowy w toku (patrz wyżej).                                        |
| `placeholder` | `true`, dopóki opis jest roboczy i czeka na potwierdzenie.                     |

Treść pod nagłówkiem to dłuższy opis — pokazuje się dopiero po kliknięciu kafelka,
więc może być spokojnie na kilka zdań.

## Logotypy

Wrzuć plik do podkatalogu `logo/` obok plików partnerów i wskaż go w nagłówku:

```yaml
logo: ./logo/botland.png
```

Najlepiej PNG z przezroczystym tłem albo SVG. Astro samo przeskaluje obraz przy
buildzie. Po logotypy pisz do sekcji promocji.

## Co czeka na materiały

```bash
npm run check:content
```

Wypisze partnerów z `placeholder: true` wraz z tym, czego przy każdym brakuje.
