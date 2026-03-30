import { useState } from 'react';

import { CountriesGrid } from '@/components/countries/countries-grid';
import { CountryCard } from '@/components/countries/country-card';
import { RegionFilter } from '@/components/countries/region-filter';
import { SearchInput } from '@/components/countries/search-input';
import { Spinner } from '@/components/ui/spinner';
import { StatusMessage } from '@/components/ui/status-message';
import { useCountries } from '@/features/countries/hooks/use-countries';
import { filterCountries } from '@/features/countries/utils/filter-countries';

import styles from './home-page.module.css';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { countries, errorMessage, status } = useCountries();
  const filteredCountries = filterCountries(countries, {
    region: selectedRegion,
    searchTerm,
  });

  return (
    <section
      className={styles.page}
      aria-labelledby="home-page-title"
      aria-busy={status === 'loading'}
    >
      <h1 id="home-page-title" className="sr-only">
        Browse countries
      </h1>

      <form
        className={styles.controls}
        aria-label="Search and filter countries"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search for a country..."
        />
        <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
      </form>

      {status === 'loading' && (
        <div className={styles.state}>
          <Spinner />
        </div>
      )}

      {status === 'error' && (
        <div className={styles.state}>
          <StatusMessage
            title="Unable to load countries"
            message={
              errorMessage ??
              'Please try again later.'
            }
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
        <CountriesGrid>
          {filteredCountries.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </CountriesGrid>
      )}
    </section>
  );
}
