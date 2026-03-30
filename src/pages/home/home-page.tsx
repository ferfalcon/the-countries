import { RegionFilter } from '@/components/countries/region-filter';
import { SearchInput } from '@/components/countries/search-input';
import { StatusMessage } from '@/components/ui/status-message';

import styles from './home-page.module.css';

export function HomePage() {
  return (
    <section className={styles.page} aria-labelledby="home-page-title">
      <header className={styles.header}>
        <h1 id="home-page-title" className={styles.title}>
          Countries Explorer
        </h1>
        <p className={styles.description}>
          Foundation scaffolding is in place. Search, filter, cards, and data
          loading will be added in the next pass.
        </p>
      </header>

      <div className={styles.controls} aria-label="Countries controls">
        <SearchInput
          value=""
          onChange={() => undefined}
          disabled
          placeholder="Search for a country..."
        />
        <RegionFilter value="" onChange={() => undefined} disabled />
      </div>

      <StatusMessage
        title="Countries list not implemented yet"
        message="This page currently verifies routing, layout, theming, and shared UI foundations only."
      />
    </section>
  );
}
