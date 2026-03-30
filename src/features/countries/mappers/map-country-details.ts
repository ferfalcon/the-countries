import type {
  BorderCountry,
  CountryDetails,
} from '@/features/countries/models/country';
import type {
  RawBorderCountry,
  RawCountryDetails,
} from '@/features/countries/models/raw-country';

export function mapCountryDetails(
  rawCountry: RawCountryDetails,
): CountryDetails {
  const nativeNameEntry = Object.values(rawCountry.name.nativeName ?? {})[0];
  const currencies = Object.values(rawCountry.currencies ?? {}).map(
    ({ name }) => name,
  );
  const languages = Object.values(rawCountry.languages ?? {});

  return {
    code: rawCountry.cca3,
    name: rawCountry.name.common,
    nativeName: nativeNameEntry?.common ?? rawCountry.name.common,
    population: rawCountry.population,
    region: rawCountry.region,
    subregion: rawCountry.subregion ?? null,
    capital: rawCountry.capital?.[0] ?? null,
    topLevelDomain: rawCountry.tld[0] ?? null,
    currencies,
    languages,
    borderCountryCodes: rawCountry.borders ?? [],
    flagAlt: rawCountry.flags.alt ?? `Flag of ${rawCountry.name.common}`,
    flagUrl: rawCountry.flags.svg,
  };
}

export function mapBorderCountry(rawCountry: RawBorderCountry): BorderCountry {
  return {
    code: rawCountry.cca3,
    name: rawCountry.name.common,
  };
}
