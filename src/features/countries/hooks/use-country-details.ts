import { useEffect, useState } from 'react';

import {
  CountryNotFoundError,
  fetchBorderCountries,
  fetchCountryDetails,
} from '@/features/countries/api/countries-api';
import {
  mapBorderCountry,
  mapCountryDetails,
} from '@/features/countries/mappers/map-country-details';
import type {
  BorderCountry,
  CountryDetails,
} from '@/features/countries/models/country';

export type CountryDetailsStatus =
  | 'loading'
  | 'success'
  | 'error'
  | 'not-found';

export interface UseCountryDetailsResult {
  borderCountries: BorderCountry[];
  country: CountryDetails | null;
  errorMessage: string | null;
  status: CountryDetailsStatus;
}

export function useCountryDetails(code: string): UseCountryDetailsResult {
  const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);
  const [country, setCountry] = useState<CountryDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<CountryDetailsStatus>(
    code ? 'loading' : 'not-found',
  );

  useEffect(() => {
    if (!code) {
      setBorderCountries([]);
      setCountry(null);
      setErrorMessage(null);
      setStatus('not-found');

      return;
    }

    const controller = new AbortController();

    async function loadCountryDetails() {
      setStatus('loading');
      setBorderCountries([]);
      setCountry(null);
      setErrorMessage(null);

      try {
        const rawCountry = await fetchCountryDetails(code, controller.signal);
        const mappedCountry = mapCountryDetails(rawCountry);
        const rawBorderCountries = await fetchBorderCountries(
          mappedCountry.borderCountryCodes,
          controller.signal,
        );
        const mappedBorderCountries = rawBorderCountries
          .map(mapBorderCountry)
          .sort((leftCountry, rightCountry) =>
            leftCountry.name.localeCompare(rightCountry.name),
          );

        if (controller.signal.aborted) {
          return;
        }

        setCountry(mappedCountry);
        setBorderCountries(mappedBorderCountries);
        setStatus('success');
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        setBorderCountries([]);
        setCountry(null);

        if (error instanceof CountryNotFoundError) {
          setErrorMessage(error.message);
          setStatus('not-found');

          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Something went wrong while loading country details.',
        );
        setStatus('error');
      }
    }

    void loadCountryDetails();

    return () => {
      controller.abort();
    };
  }, [code]);

  return {
    borderCountries,
    country,
    errorMessage,
    status,
  };
}
