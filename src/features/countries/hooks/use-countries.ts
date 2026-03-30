import { useEffect, useState } from 'react';

import { fetchCountrySummaries } from '@/features/countries/api/countries-api';
import { mapCountrySummary } from '@/features/countries/mappers/map-country-summary';
import type { CountrySummary } from '@/features/countries/models/country';

export type CountriesStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseCountriesResult {
  countries: CountrySummary[];
  errorMessage: string | null;
  status: CountriesStatus;
}

export function useCountries(): UseCountriesResult {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<CountriesStatus>('loading');

  useEffect(() => {
    let isCancelled = false;

    async function loadCountries() {
      try {
        const rawCountries = await fetchCountrySummaries();

        if (isCancelled) {
          return;
        }

        setCountries(rawCountries.map(mapCountrySummary));
        setErrorMessage(null);
        setStatus('success');
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setCountries([]);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Something went wrong while loading countries.',
        );
        setStatus('error');
      }
    }

    void loadCountries();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    countries,
    errorMessage,
    status,
  };
}
