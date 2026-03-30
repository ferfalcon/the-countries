import { Link } from 'react-router';

import type { BorderCountry } from '@/features/countries/models/country';

import styles from './border-countries-list.module.css';

interface BorderCountriesListProps {
  countries: BorderCountry[];
}

export function BorderCountriesList({ countries }: BorderCountriesListProps) {
  if (countries.length === 0) {
    return (
      <p className={styles.empty}>This country has no bordering countries.</p>
    );
  }

  return (
    <ul className={styles.list}>
      {countries.map((country) => (
        <li key={country.code}>
          <Link to={`/country/${country.code}`} className={styles.link}>
            {country.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
