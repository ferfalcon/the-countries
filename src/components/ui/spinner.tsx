import styles from './spinner.module.css';

export function Spinner() {
  return (
    <div className={styles.spinner} role="status" aria-live="polite">
      <span className={styles.indicator} aria-hidden="true" />
      <span className={styles.label}>Loading...</span>
    </div>
  );
}
