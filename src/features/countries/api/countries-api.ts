import type {
  RawCountryDetails,
  RawCountrySummary,
} from '@/features/countries/models/raw-country';

const COUNTRIES_API_BASE_URL = 'https://restcountries.com/v3.1';
const COUNTRY_SUMMARY_FIELDS = ['cca3', 'capital', 'flags', 'name', 'population', 'region'];

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
  _code: string,
): Promise<RawCountryDetails> {
  void _code;

  throw new Error('fetchCountryDetails is not implemented yet.');
}
