import styles from './search-input.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  disabled = false,
  placeholder = 'Search...',
}: SearchInputProps) {
  return (
    <label className={styles.field}>
      <span className="sr-only">Search for a country</span>
      <span className={styles.icon} aria-hidden="true" />
      <input
        className={styles.input}
        type="search"
        name="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        spellCheck={false}
      />
    </label>
  );
}
