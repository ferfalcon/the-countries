export interface RawCountryName {
  common: string;
  nativeName?: Record<
    string,
    {
      common: string;
    }
  >;
  official?: string;
}

interface RawCountryFlags {
  alt?: string;
  svg: string;
}

export interface RawCountrySummary {
  cca2: string;
  cca3: string;
  capital?: string[];
  name: RawCountryName;
  population: number;
  region: string;
}

export interface RawBorderCountry {
  cca3: string;
  name: Pick<RawCountryName, 'common'>;
}

export interface RawCountryDetails {
  borders?: string[];
  capital?: string[];
  cca3: string;
  currencies?: Record<
    string,
    {
      name: string;
    }
  >;
  flags: RawCountryFlags;
  languages?: Record<string, string>;
  name: RawCountryName;
  population: number;
  region: string;
  subregion?: string;
  tld: string[];
}
