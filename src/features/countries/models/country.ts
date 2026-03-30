export interface CountrySummary {
  code: string;
  name: string;
  population: number;
  region: string;
  capital: string | null;
  flagAlt: string;
  flagUrl: string;
}

export interface CountryDetails {
  code: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string | null;
  capital: string | null;
  topLevelDomain: string | null;
  currencies: string[];
  languages: string[];
  borderCountryCodes: string[];
  flagAlt: string;
  flagUrl: string;
}
