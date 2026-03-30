import type { CountryDetails } from '@/features/countries/models/country';

interface CountryDetailsPanelProps {
  country: CountryDetails;
}

export function CountryDetailsPanel({ country }: CountryDetailsPanelProps) {
  return (
    <section aria-labelledby="country-name">
      <h2 id="country-name">{country.name}</h2>
      <p>Native name: {country.nativeName}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion ?? 'N/A'}</p>
      <p>Capital: {country.capital ?? 'N/A'}</p>
    </section>
  );
}
