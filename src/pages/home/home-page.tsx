import { useState } from 'react';

import { CountriesGrid } from '@/components/countries/countries-grid';
import { CountryCard } from '@/components/countries/country-card';
import { RegionFilter } from '@/components/countries/region-filter';
import { SearchInput } from '@/components/countries/search-input';

import { mockCountrySummaries } from './home-page.mock';
import styles from './home-page.module.css';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  return (
    <section className={styles.page} aria-labelledby="home-page-title">
      <h1 id="home-page-title" className="sr-only">
        Browse countries
      </h1>

      <div className={styles.controls} aria-label="Countries controls">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search for a country..."
        />
        <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
      </div>

      <CountriesGrid>
        {mockCountrySummaries.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </CountriesGrid>
    </section>
  );
}
