import { useEffect } from 'react';
import { useParams } from 'react-router';

import { BackButton } from '@/components/countries/back-button';
import { CountryDetailsPanel } from '@/components/countries/country-details-panel';
import { Spinner } from '@/components/ui/spinner';
import { StatusMessage } from '@/components/ui/status-message';
import { useCountryDetails } from '@/features/countries/hooks/use-country-details';

import styles from './country-details-page.module.css';

export function CountryDetailsPage() {
  const { code = '' } = useParams();
  const { borderCountries, country, errorMessage, status } = useCountryDetails(
    code,
  );

  useEffect(() => {
    if (status === 'success' && country) {
      document.title = `${country.name} | REST Countries`;

      return;
    }

    if (status === 'not-found') {
      document.title = 'Country not found | REST Countries';

      return;
    }

    if (status === 'error') {
      document.title = 'Unable to load country | REST Countries';

      return;
    }

    document.title = 'REST Countries | Country details';
  }, [country, status]);

  return (
    <section className={styles.page} aria-busy={status === 'loading'}>
      <BackButton />

      {status === 'loading' && (
        <div className={styles.state}>
          <Spinner />
        </div>
      )}

      {status === 'error' && (
        <div className={styles.state}>
          <StatusMessage
            title="Unable to load country"
            message={errorMessage ?? 'Please try again later.'}
          />
        </div>
      )}

      {status === 'not-found' && (
        <div className={styles.state}>
          <StatusMessage
            title="Country not found"
            message={errorMessage ?? 'The requested country could not be found.'}
          />
        </div>
      )}

      {status === 'success' && country && (
        <div className={styles.content}>
          <CountryDetailsPanel
            country={country}
            borderCountries={borderCountries}
          />
        </div>
      )}
    </section>
  );
}
