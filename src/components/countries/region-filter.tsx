const REGION_OPTIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

interface RegionFilterProps {
  value: string;
  onChange: (region: string) => void;
  disabled?: boolean;
}

export function RegionFilter({
  value,
  onChange,
  disabled = false,
}: RegionFilterProps) {
  return (
    <label>
      <span className="sr-only">Filter by region</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        <option value="">Filter by Region</option>
        {REGION_OPTIONS.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </label>
  );
}
