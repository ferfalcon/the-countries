import iconSearchDark from '@/assets/icon-search-dark.svg';
import iconSearchLight from '@/assets/icon-search-light.svg';
import { useTheme } from '@/features/theme/use-theme';

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
  const { theme } = useTheme();

  return (
    <label className={styles.field}>
      <span className="sr-only">Search for a country</span>
      <img
        className={styles.icon}
        src={theme === 'light' ? iconSearchLight : iconSearchDark}
        alt=""
        aria-hidden="true"
      />
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
