import type {
  RawCountryDetails,
  RawCountrySummary,
} from '@/features/countries/models/raw-country';

export async function fetchCountrySummaries(): Promise<RawCountrySummary[]> {
  throw new Error('fetchCountrySummaries is not implemented yet.');
}

export async function fetchCountryDetails(
  _code: string,
): Promise<RawCountryDetails> {
  void _code;

  throw new Error('fetchCountryDetails is not implemented yet.');
}
