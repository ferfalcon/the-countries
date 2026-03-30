import type { CountrySummary } from '@/features/countries/models/country';

export interface FilterCountriesOptions {
  region: string;
  searchTerm: string;
}

export function filterCountries(
  countries: CountrySummary[],
  _options: FilterCountriesOptions,
): CountrySummary[] {
  void _options;

  return countries;
}
