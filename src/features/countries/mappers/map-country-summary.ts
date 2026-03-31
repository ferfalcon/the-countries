import type { CountrySummary } from '@/features/countries/models/country';
import type { RawCountrySummary } from '@/features/countries/models/raw-country';

function buildSummaryFlagUrl(cca2: string) {
  return `https://flagcdn.com/${cca2.toLowerCase()}.svg`;
}

export function mapCountrySummary(
  rawCountry: RawCountrySummary,
): CountrySummary {
  return {
    code: rawCountry.cca3,
    name: rawCountry.name.common,
    population: rawCountry.population,
    region: rawCountry.region,
    capital: rawCountry.capital?.[0] ?? null,
    flagAlt: `Flag of ${rawCountry.name.common}`,
    flagUrl: buildSummaryFlagUrl(rawCountry.cca2),
  };
}
