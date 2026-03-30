import type { CountrySummary } from '@/features/countries/models/country';

export type CountriesStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseCountriesResult {
  countries: CountrySummary[];
  errorMessage: string | null;
  status: CountriesStatus;
}

export function useCountries(): UseCountriesResult {
  return {
    countries: [],
    errorMessage: null,
    status: 'idle',
  };
}
