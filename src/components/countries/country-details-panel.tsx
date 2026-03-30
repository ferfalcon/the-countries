import { BorderCountriesList } from '@/components/countries/border-countries-list';
import type {
  BorderCountry,
  CountryDetails,
} from '@/features/countries/models/country';

import styles from './country-details-panel.module.css';

interface CountryDetailsPanelProps {
  borderCountries: BorderCountry[];
  country: CountryDetails;
}

function formatList(values: string[]) {
  return values.length > 0 ? values.join(', ') : 'N/A';
}

export function CountryDetailsPanel({
  borderCountries,
  country,
}: CountryDetailsPanelProps) {
  return (
    <article className={styles.panel}>
      <img className={styles.flag} src={country.flagUrl} alt={country.flagAlt} />

      <section className={styles.content} aria-labelledby="country-name">
        <h1 id="country-name" className={styles.name}>
          {country.name}
        </h1>

        <div className={styles.details}>
          <dl className={styles.list}>
            <div className={styles.row}>
              <dt className={styles.term}>Native Name:</dt>
              <dd className={styles.value}>{country.nativeName}</dd>
            </div>
            <div className={styles.row}>
              <dt className={styles.term}>Population:</dt>
              <dd className={styles.value}>
                {country.population.toLocaleString()}
              </dd>
            </div>
            <div className={styles.row}>
              <dt className={styles.term}>Region:</dt>
              <dd className={styles.value}>{country.region}</dd>
            </div>
            <div className={styles.row}>
              <dt className={styles.term}>Sub Region:</dt>
              <dd className={styles.value}>{country.subregion ?? 'N/A'}</dd>
            </div>
            <div className={styles.row}>
              <dt className={styles.term}>Capital:</dt>
              <dd className={styles.value}>{country.capital ?? 'N/A'}</dd>
            </div>
          </dl>

          <dl className={styles.list}>
            <div className={styles.row}>
              <dt className={styles.term}>Top Level Domain:</dt>
              <dd className={styles.value}>{country.topLevelDomain ?? 'N/A'}</dd>
            </div>
            <div className={styles.row}>
              <dt className={styles.term}>Currencies:</dt>
              <dd className={styles.value}>{formatList(country.currencies)}</dd>
            </div>
            <div className={styles.row}>
              <dt className={styles.term}>Languages:</dt>
              <dd className={styles.value}>{formatList(country.languages)}</dd>
            </div>
          </dl>
        </div>

        <section className={styles.borders} aria-labelledby="border-countries-title">
          <h2 id="border-countries-title" className={styles.borderTitle}>
            Border Countries:
          </h2>
          <BorderCountriesList countries={borderCountries} />
        </section>
      </section>
    </article>
  );
}
