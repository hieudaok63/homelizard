export type RegionData = IRegion[];

export interface IRegion {
  Summary: string;
  "Was bietet Landsberg am Lech": WasBietetLandsbergAmLech;
  "Immobilienpreise und Entwicklung": ImmobilienpreiseUndEntwicklung;
  "Wie lebt es sich in Landsberg am Lech": WieLebtEsSichInLandsbergAmLech;
  Basisdaten: Basisdaten;
  "Landsberg am Lech in der Geschichte": string;
}

export interface WasBietetLandsbergAmLech {
  Lebensqualität: string;
  Bestlage: string;
  Natur: string;
}

export interface ImmobilienpreiseUndEntwicklung {
  "Wohnungen zur Miete": string;
  "Wohnungen zum Kauf": string;
  "Häuser zum Kauf": string;
  "Grundstücke zum Kauf": string;
}

export interface WieLebtEsSichInLandsbergAmLech {
  Restaurants: string;
  Familien: string;
  Verkehr: string;
}

export interface Basisdaten {
  Bundesland: string;
  Regierungsbezirk: string;
  Höhe: string;
  Fläche: string;
  Einwohner: string;
  Bevölkerungsdichte: string;
  Postleitzahl: string;
  Vorwahl: string;
  "Kfz-Kennzeichen": string;
  Gemeindeschlüssel: string;
  Stadtgliederung: string;
  "Adresse der Stadtverwaltung": string;
  Website: string;
  Oberbürgermeister: string;
}
