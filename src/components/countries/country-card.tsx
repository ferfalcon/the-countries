import type { CountrySummary } from '@/features/countries/models/country';

interface CountryCardProps {
  country: CountrySummary;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article>
      <h2>{country.name}</h2>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital ?? 'N/A'}</p>
    </article>
  );
}
