import type { CountryDetails } from '@/features/countries/models/country';

import type { CountriesStatus } from './use-countries';

export interface UseCountryDetailsResult {
  country: CountryDetails | null;
  errorMessage: string | null;
  status: CountriesStatus;
}

export function useCountryDetails(_code: string): UseCountryDetailsResult {
  void _code;

  return {
    country: null,
    errorMessage: null,
    status: 'idle',
  };
}
