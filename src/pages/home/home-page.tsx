import { useEffect, useState } from 'react';

import { CountriesGrid } from '@/components/countries/countries-grid';
import { CountryCard } from '@/components/countries/country-card';
import { RegionFilter } from '@/components/countries/region-filter';
import { SearchInput } from '@/components/countries/search-input';
import { Spinner } from '@/components/ui/spinner';
import { StatusMessage } from '@/components/ui/status-message';
import { useCountries } from '@/features/countries/hooks/use-countries';
import { filterCountries } from '@/features/countries/utils/filter-countries';

import styles from './home-page.module.css';

const INITIAL_COUNTRIES_BATCH_SIZE = 24;
const PRIORITIZED_COUNTRY_IMAGE_COUNT = 4;

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNTRIES_BATCH_SIZE);
  const { countries, errorMessage, status } = useCountries();
  const filteredCountries = filterCountries(countries, {
    region: selectedRegion,
    searchTerm,
  });
  const visibleCountries = filteredCountries.slice(0, visibleCount);
  const hasMoreCountries = visibleCountries.length < filteredCountries.length;

  useEffect(() => {
    document.title = 'REST Countries | Explore countries';
  }, []);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNTRIES_BATCH_SIZE);
  }, [searchTerm, selectedRegion]);

  return (
    <section
      className={styles.page}
      aria-labelledby="home-page-title"
      aria-busy={status === 'loading'}
    >
      <h1 id="home-page-title" className="sr-only">
        Browse countries
      </h1>

      <section
        className={styles.controls}
        role="group"
        aria-label="Search and filter countries"
      >
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search for a country..."
        />
        <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
      </section>

      {status === 'loading' && (
        <div className={styles.state}>
          <Spinner />
        </div>
      )}

      {status === 'error' && (
        <div className={styles.state}>
          <StatusMessage
            title="Unable to load countries"
            message={errorMessage ?? 'Please try again later.'}
          />
        </div>
      )}

      {status === 'success' && filteredCountries.length === 0 && (
        <div className={styles.state}>
          <StatusMessage
            title="No countries found"
            message="Try a different search term or region."
          />
        </div>
      )}

      {status === 'success' && filteredCountries.length > 0 && (
        <>
          <CountriesGrid>
            {visibleCountries.map((country, index) => (
              <CountryCard
                key={country.code}
                country={country}
                prioritizeImage={index < PRIORITIZED_COUNTRY_IMAGE_COUNT}
              />
            ))}
          </CountriesGrid>

          {hasMoreCountries && (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.showMoreButton}
                onClick={() => {
                  setVisibleCount(
                    (currentVisibleCount) =>
                      currentVisibleCount + INITIAL_COUNTRIES_BATCH_SIZE,
                  );
                }}
              >
                Show more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
