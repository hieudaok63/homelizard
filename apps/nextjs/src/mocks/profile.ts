export interface IMainProfileTabItem {
  id: number;
  content: string;
  description: string;
  color: string;
  percent: string;
  path: string;
}
type TPersonalDataItem = {
  id: number;
  title: string;
  content: string;
  percent: number;
  image?: string | null;
  show_percent?: boolean;
  icon?: JSX.Element;
};
type TPersonalData = TPersonalDataItem & {
  is_active: boolean;
  subPersonData: TPersonalDataItem[];
};

export const FinanzenData = [
  {
    id: 1,
    title: "Zusagen",
    content: "Filled",
    color: "bg-blue_2",
    percent: 30,
    subFinanzen: [
      {
        id: 1,
        title: "Bonität",
        content: "Noch nicht verfügbar",
      },
      {
        id: 2,
        title: "Bonität",
        content: "Noch nicht verfügbar",
      },
    ],
  },
  {
    id: 2,
    title: "Bonität",
    content: "Filled",
    color: "bg-blue_2",
    percent: 0,
    subFinanzen: [
      {
        id: 1,
        title: "Bonität",
        content: "Noch nicht verfügbar",
      },
    ],
    chilFinanzenTab: [
      {
        id: 1,
        title: "Bonitätsangaben",
        content: "Zahlungsverhalten",
      },
      {
        id: 2,
        title: "Wohnorte",
        content: "Bisherige Wohnorte",
      },
      {
        id: 3,
        title: "Familienstand",
        content: "Ehegatten, Kinder, etc...",
      },
      {
        id: 4,
        title: "Laufende Kredite",
        content: "Höhe und Zwecke",
      },
      {
        id: 5,
        title: "Eigentum",
        content: "Besitzt du bereits Immobilien?",
      },
      {
        id: 6,
        title: "Investments",
        content: "Unternehmensbeteiligungen",
      },
    ],
  },
  {
    id: 3,
    title: "Finanzierung",
    content: "Filled",
    color: "bg-blue_2",
    percent: 0,
    subFinanzen: [
      {
        id: 1,
        title: "Bonität",
        content: "Noch nicht verfügbar",
      },
    ],
    chilFinanzenTab: [
      {
        id: 1,
        title: "Nachweise",
        content: "Einkommensnachweis, Kontoauszüge",
      },
      {
        id: 2,
        title: "Wirtschaftliche Bonität",
        content: "Gehalt, Werte, monatliche Ausgaben",
      },
      {
        id: 3,
        title: "Travel",
        content: "Your travel destinations",
      },
    ],
  },
];

export const ProfileArrays: IMainProfileTabItem[] = [
  {
    id: 1,
    content: "Persönliche Daten",
    description: "Adressen, etc adressen, etcAdressen, etc",
    color: "bg-yellow-500",
    percent: "20",
    path: "/profile/PersonalData",
  },
  {
    id: 2,
    content: "Finanzen",
    description: "Finanzierung, Bank etc",
    color: "bg-blue_1",
    percent: "30",
    path: "/profile/Finanzen",
  },
  {
    id: 3,
    content: "Suchen",
    description: "Suchen und Filter",
    color: "bg-green",
    percent: "30",
    path: "/profile/Suchen",
  },
  {
    id: 4,
    content: "Objekte",
    description: "Such-Ergebnisse",
    color: "bg-pink",
    percent: "40",
    path: "/profile/Favorite",
  },
];

export const personalDataMocks = [
  {
    id: 1,
    title: "Kontaktdetails",
    content: "Filled",
    percent: 53,
    image: null,
    is_active: false,
    show_percent: true,
    subPersonData: [
      {
        id: 1,
        title: "Basisdaten",
        content: "Titel, Namen, Beruf, Geburtsdaten",
        percent: 53,
        image: null,
      },
      {
        id: 2,
        title: "Mobile phone",
        content: "Telefonische Erreichbarkeit",
        percent: 0,
        image: null,
      },
      {
        id: 3,
        title: "Email & web",
        content: "Email- und Web-Adressen",
        percent: 0,
        image: null,
      },
      {
        id: 4,
        title: "Adressen",
        content: "Wohnort, Zweitwohnsitz, etc...",
        percent: 35,
        image: null,
      },
    ],
  },
  {
    id: 2,
    title: "Beruf",
    content: "Ihr Arbeitsplatz und Lebenslauf",
    percent: 0,
    image: null,
    is_active: false,
    show_percent: false,
    subPersonData: [
      {
        id: 1,
        title: "Arbeitsplatz",
        content: "Wo und wie arbeiten Sie?",
        percent: 53,
        image: null,
      },
      {
        id: 2,
        title: "Curriculum vitae",
        content: "Ausbildung, Qualifikation",
        percent: 0,
        image: null,
      },
    ],
  },
] as TPersonalData[];
