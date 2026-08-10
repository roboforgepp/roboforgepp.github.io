/**
 * Tokeny tonu dla ciemnych sekcji. Komponenty (Button, Tag, SectionHeading,
 * Card) czytają `--tone-*`, więc każdy ciemny blok musi je przestawić —
 * inaczej dziedziczy jasną paletę z `:root` i dostaje np. ciemny tekst
 * przycisku na ciemnym tle.
 *
 * Trzymane w jednym miejscu, bo używa tego `Section tone="ink"` oraz ciemne
 * nagłówki stron, które sekcją nie są.
 */
export const INK_TONE =
  '[--tone-fg:#ffffff] [--tone-muted:rgba(255,255,255,.64)] [--tone-faint:rgba(255,255,255,.42)] [--tone-line:rgba(255,255,255,.14)] [--tone-surface:var(--color-ink-2)]';
