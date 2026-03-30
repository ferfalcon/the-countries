export interface BorderCountryLink {
  code: string;
  name: string;
}

interface BorderCountriesListProps {
  countries: BorderCountryLink[];
}

export function BorderCountriesList({ countries }: BorderCountriesListProps) {
  if (countries.length === 0) {
    return <p>No border countries available.</p>;
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.code}>{country.name}</li>
      ))}
    </ul>
  );
}
