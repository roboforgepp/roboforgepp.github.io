/**
 * Jedno źródło prawdy dla nawigacji, kontaktów i socialów.
 * Zmiana linku czy maila = zmiana w tym pliku, nie w pięciu komponentach.
 */

export type SocialIconName =
    | "github"
    | "facebook"
    | "instagram"
    | "tiktok"
    | "linkedin"
    | "youtube"
    | "spotify";

/**
 * Czy strona ma trafiać do wyszukiwarek.
 *
 * `false` (stan na teraz — WIP) wstawia `noindex, nofollow` w <head> KAŻDEJ
 * podstrony. To jest ten mechanizm, który realnie trzyma adresy poza Google;
 * `Disallow` w robots.txt tylko blokuje pobranie treści i potrafi zostawić
 * w wynikach goły URL bez opisu, więc celowo go nie używamy (szczegóły
 * w komentarzu w public/robots.txt).
 *
 * PRZED PREMIERĄ: ustaw na `true`, zbuduj i zdeployuj. Nic więcej nie trzeba.
 */
export const INDEXABLE = false;

export const SITE = {
    name: "RoboForge",
    shortDescription: "Koło Naukowe Robotyki Politechniki Poznańskiej",
    description:
        "RoboForge to koło naukowe studentów Politechniki Poznańskiej. Projektujemy modułową platformę robotyczną: wymienne podstawy, nadstawy i systemy sterowania.",
    url: "https://roboforgepp.github.io",
    foundedYear: 2025,
    locale: "pl_PL",
    lang: "pl",
} as const;

export const NAV_LINKS = [
    { href: "/", label: "Start" },
    { href: "/projects", label: "Projekty" },
    { href: "/team", label: "Zespół" },
    { href: "/partners", label: "Partnerzy" },
    { href: "/media", label: "Media" },
    { href: "/contact", label: "Kontakt" },
] as const;

/** D4 — maile podane przez Antoniego. Ogólna skrzynka jest pierwsza (główny kontakt). */
export const CONTACTS = [
    {
        label: "Kontakt ogólny",
        role: "Współpraca, patronaty, media",
        email: "roboforgepp@gmail.com",
    },
    {
        label: "Antoni Tomczak",
        role: "Kowal Master — prezes koła",
        email: "antoni.tomczak@student.put.poznan.pl",
    },
    {
        label: "Bartosz Zawłocki",
        role: "Konstrukcja i dokumentacja techniczna",
        email: "bartosz.zawlocki@student.put.poznan.pl",
    },
] as const;

/**
 * D7 — TikTok czeka na link od Dominika. `href: null` oznacza „profil zapowiedziany,
 * adresu jeszcze nie mamy" i renderuje się jako nieaktywna ikona z tooltipem.
 */
export const SOCIALS: {
    label: string;
    href: string | null;
    icon: SocialIconName;
    handle?: string;
}[] = [
    {
        label: "GitHub",
        href: "https://github.com/roboforgepp",
        icon: "github",
        handle: "@roboforgepp",
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61584252311663",
        icon: "facebook",
        handle: "RoboForge PP",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/roboforgepp/",
        icon: "instagram",
        handle: "@roboforgepp",
    },
    { label: "TikTok", href: null, icon: "tiktok", handle: "@roboforgepp" },
];

/** D8 — audycja radiowa jako „backdrop". Docelowo cykl comiesięczny. */
export const RADIO_EPISODE = {
    title: "RoboForge w radiu — audycja o kuźni",
    spotifyUrl: "https://open.spotify.com/episode/3EIUzmOqNmCNhD2yPrufSF",
    embedUrl:
        "https://open.spotify.com/embed/episode/3EIUzmOqNmCNhD2yPrufSF?utm_source=generator&theme=0",
};

/** Sekcje koła — źródło dla /team i dla statystyki „sekcje". */
export const TEAM_SECTIONS = [
    {
        name: "Kowal Master",
        description:
            "Zarząd koła. Wyznacza kierunek, pilnuje harmonogramu i reprezentuje RoboForge na zewnątrz.",
        leaderName: "Antoni Tomczak",
    },
    {
        name: "Kowale mechanicy",
        description:
            "Projektują konstrukcję: podstawy jezdne, ramy, przekładnie i mocowania nadstaw. Od szkicu, przez CAD, po wydruk i frezowanie.",
        leaderName: "Rafał Wypychowski",
    },
    {
        name: "Kowale elektronicy",
        description:
            "Zasilanie, sterowniki silników, magistrale i czujniki. Odpowiadają za to, żeby mechanika dostała prąd i sygnał tam, gdzie trzeba.",
        leaderName: "Maciej Wójcik",
    },
    {
        name: "Kowale informatycy",
        description:
            "Oprogramowanie robota, interfejsy sterowania, przetwarzanie danych z sensorów oraz ta strona.",
        leaderName: "Tymoteusz Tomczak",
    },
    {
        name: "Kowale promocji",
        description:
            "Social media, materiały graficzne, kontakt z partnerami i relacje z tego, co dzieje się w kuźni.",
        leaderName: "Dominik Ziemiański",
    },
] as const;
