import { BackButton } from '@/components/countries/back-button';
import { StatusMessage } from '@/components/ui/status-message';

import styles from './country-details-page.module.css';

export function CountryDetailsPage() {
  return (
    <section className={styles.page} aria-labelledby="country-details-title">
      <BackButton />
      <div className={styles.content}>
        <h1 id="country-details-title" className={styles.title}>
          Country Details
        </h1>
        <StatusMessage
          title="Country details not implemented yet"
          message="The route is wired and ready for the future details data flow."
        />
      </div>
    </section>
  );
}
