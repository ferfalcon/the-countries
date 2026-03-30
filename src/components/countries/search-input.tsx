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
    <label>
      <span className="sr-only">Search for a country</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
      />
    </label>
  );
}
