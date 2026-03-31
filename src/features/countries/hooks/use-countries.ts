import { useEffect, useState } from 'react';

import { fetchCountrySummaries } from '@/features/countries/api/countries-api';
import { mapCountrySummary } from '@/features/countries/mappers/map-country-summary';
import type { CountrySummary } from '@/features/countries/models/country';

export type CountriesStatus = 'loading' | 'success' | 'error';

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
    const controller = new AbortController();

    async function loadCountries() {
      try {
        const rawCountries = await fetchCountrySummaries(controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setCountries(rawCountries.map(mapCountrySummary));
        setErrorMessage(null);
        setStatus('success');
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
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
      controller.abort();
    };
  }, []);

  return {
    countries,
    errorMessage,
    status,
  };
}
