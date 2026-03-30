import type { CountrySummary } from '@/features/countries/models/country';

export interface FilterCountriesOptions {
  region: string;
  searchTerm: string;
}

export function filterCountries(
  countries: CountrySummary[],
  options: FilterCountriesOptions,
): CountrySummary[] {
  const normalizedSearchTerm = options.searchTerm.trim().toLowerCase();

  return countries.filter((country) => {
    const matchesRegion =
      options.region === '' || country.region === options.region;
    const matchesSearch =
      normalizedSearchTerm === '' ||
      country.name.toLowerCase().includes(normalizedSearchTerm);

    return matchesRegion && matchesSearch;
  });
}
