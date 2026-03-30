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
  cca3: string;
  capital?: string[];
  flags: RawCountryFlags;
  name: RawCountryName;
  population: number;
  region: string;
}

export interface RawBorderCountry {
  cca3: string;
  name: Pick<RawCountryName, 'common'>;
}

export interface RawCountryDetails extends RawCountrySummary {
  borders?: string[];
  currencies?: Record<
    string,
    {
      name: string;
    }
  >;
  languages?: Record<string, string>;
  subregion?: string;
  tld: string[];
}
