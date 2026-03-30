import type { PropsWithChildren } from 'react';

import styles from './countries-grid.module.css';

export function CountriesGrid({ children }: PropsWithChildren) {
  return <ul className={styles.grid}>{children}</ul>;
}
