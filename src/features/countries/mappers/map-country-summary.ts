import type { CountrySummary } from '@/features/countries/models/country';
import type { RawCountrySummary } from '@/features/countries/models/raw-country';

export function mapCountrySummary(
  rawCountry: RawCountrySummary,
): CountrySummary {
  return {
    code: rawCountry.cca3,
    name: rawCountry.name.common,
    population: rawCountry.population,
    region: rawCountry.region,
    capital: rawCountry.capital?.[0] ?? null,
    flagAlt: rawCountry.flags.alt ?? `${rawCountry.name.common} flag`,
    flagUrl: rawCountry.flags.svg,
  };
}
