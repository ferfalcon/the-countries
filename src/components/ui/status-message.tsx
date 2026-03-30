interface StatusMessageProps {
  title: string;
  message: string;
}

export function StatusMessage({ title, message }: StatusMessageProps) {
  return (
    <section aria-live="polite">
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}
