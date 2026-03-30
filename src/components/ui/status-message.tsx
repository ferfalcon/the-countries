import styles from './status-message.module.css';

interface StatusMessageProps {
  title: string;
  message: string;
}

export function StatusMessage({ title, message }: StatusMessageProps) {
  return (
    <section className={styles.message} aria-live="polite">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{message}</p>
    </section>
  );
}
