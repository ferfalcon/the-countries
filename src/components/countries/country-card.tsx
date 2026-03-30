import { Link } from 'react-router';

import type { CountrySummary } from '@/features/countries/models/country';

import styles from './country-card.module.css';

interface CountryCardProps {
  country: CountrySummary;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <li className={styles.item}>
      <article className={styles.card}>
        <Link
          to={`/country/${country.code}`}
          className={styles.link}
          aria-label={`View details for ${country.name}`}
        >
          <img
            className={styles.flag}
            src={country.flagUrl}
            alt={country.flagAlt}
            loading="lazy"
          />

          <div className={styles.body}>
            <h2 className={styles.name}>{country.name}</h2>

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt className={styles.term}>Population:</dt>
                <dd className={styles.value}>
                  {country.population.toLocaleString()}
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.term}>Region:</dt>
                <dd className={styles.value}>{country.region}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.term}>Capital:</dt>
                <dd className={styles.value}>{country.capital ?? 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </Link>
      </article>
    </li>
  );
}
