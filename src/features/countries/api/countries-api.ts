import type {
  RawBorderCountry,
  RawCountryDetails,
  RawCountrySummary,
} from '@/features/countries/models/raw-country';

const COUNTRIES_API_BASE_URL = 'https://restcountries.com/v3.1';
const COUNTRY_SUMMARY_FIELDS = [
  'cca3',
  'capital',
  'flags',
  'name',
  'population',
  'region',
];
const COUNTRY_DETAILS_FIELDS = [
  'borders',
  'capital',
  'cca3',
  'currencies',
  'flags',
  'languages',
  'name',
  'population',
  'region',
  'subregion',
  'tld',
];
const BORDER_COUNTRY_FIELDS = ['cca3', 'name'];

export class CountryNotFoundError extends Error {
  constructor(code: string) {
    super(`Country "${code}" was not found.`);
    this.name = 'CountryNotFoundError';
  }
}

function getCountryFromResponse<T>(payload: T | T[]): T {
  if (Array.isArray(payload)) {
    const firstCountry = payload[0];

    if (!firstCountry) {
      throw new Error('Country response was empty.');
    }

    return firstCountry;
  }

  return payload;
}

export async function fetchCountrySummaries(): Promise<RawCountrySummary[]> {
  const response = await fetch(
    `${COUNTRIES_API_BASE_URL}/all?fields=${COUNTRY_SUMMARY_FIELDS.join(',')}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch countries.');
  }

  return (await response.json()) as RawCountrySummary[];
}

export async function fetchCountryDetails(
  code: string,
): Promise<RawCountryDetails> {
  const response = await fetch(
    `${COUNTRIES_API_BASE_URL}/alpha/${code}?fields=${COUNTRY_DETAILS_FIELDS.join(',')}`,
  );

  if (response.status === 404) {
    throw new CountryNotFoundError(code);
  }

  if (!response.ok) {
    throw new Error('Failed to fetch country details.');
  }

  return getCountryFromResponse(
    (await response.json()) as RawCountryDetails | RawCountryDetails[],
  );
}

export async function fetchBorderCountries(
  codes: string[],
): Promise<RawBorderCountry[]> {
  if (codes.length === 0) {
    return [];
  }

  const response = await fetch(
    `${COUNTRIES_API_BASE_URL}/alpha?codes=${codes.join(',')}&fields=${BORDER_COUNTRY_FIELDS.join(',')}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch border countries.');
  }

  return (await response.json()) as RawBorderCountry[];
}
