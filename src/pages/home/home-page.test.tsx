import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ThemeProvider } from '@/features/theme/theme-provider';
import type { CountrySummary } from '@/features/countries/models/country';

import { HomePage } from './home-page';

const useCountriesMock = vi.fn();

vi.mock('@/features/countries/hooks/use-countries', () => ({
  useCountries: () => useCountriesMock(),
}));

const countries: CountrySummary[] = [
  {
    code: 'BRA',
    name: 'Brazil',
    population: 203062512,
    region: 'Americas',
    capital: 'Brasilia',
    flagAlt: 'Flag of Brazil',
    flagUrl: 'https://flagcdn.com/br.svg',
  },
  {
    code: 'DEU',
    name: 'Germany',
    population: 83240525,
    region: 'Europe',
    capital: 'Berlin',
    flagAlt: 'Flag of Germany',
    flagUrl: 'https://flagcdn.com/de.svg',
  },
  {
    code: 'JPN',
    name: 'Japan',
    population: 125836021,
    region: 'Asia',
    capital: 'Tokyo',
    flagAlt: 'Flag of Japan',
    flagUrl: 'https://flagcdn.com/jp.svg',
  },
];

const manyCountries = Array.from({ length: 30 }, (_, index) => ({
  code: `C${index + 1}`,
  name: `Country ${index + 1}`,
  population: 1000 + index,
  region: index < 26 ? 'Europe' : 'Asia',
  capital: `Capital ${index + 1}`,
  flagAlt: `Flag of Country ${index + 1}`,
  flagUrl: `https://flagcdn.com/c${index + 1}.svg`,
})) satisfies CountrySummary[];

function renderHomePage() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  beforeEach(() => {
    useCountriesMock.mockReset();
  });

  it('renders the loading state', () => {
    useCountriesMock.mockReturnValue({
      countries: [],
      errorMessage: null,
      status: 'loading',
    });

    renderHomePage();

    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
  });

  it('renders the error state', () => {
    useCountriesMock.mockReturnValue({
      countries: [],
      errorMessage: 'Failed to fetch countries.',
      status: 'error',
    });

    renderHomePage();

    expect(
      screen.getByRole('heading', { name: 'Unable to load countries' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch countries.')).toBeInTheDocument();
  });

  it('renders the empty state', () => {
    useCountriesMock.mockReturnValue({
      countries: [],
      errorMessage: null,
      status: 'success',
    });

    renderHomePage();

    expect(
      screen.getByRole('heading', { name: 'No countries found' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Try a different search term or region.'),
    ).toBeInTheDocument();
  });

  it('renders country cards in the success state', () => {
    useCountriesMock.mockReturnValue({
      countries,
      errorMessage: null,
      status: 'success',
    });

    renderHomePage();

    expect(screen.getByRole('heading', { name: 'Brazil' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Germany' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Japan' })).toBeInTheDocument();
  });

  it('renders only the initial batch and reveals more countries progressively', async () => {
    const user = userEvent.setup();

    useCountriesMock.mockReturnValue({
      countries: manyCountries,
      errorMessage: null,
      status: 'success',
    });

    renderHomePage();

    expect(
      screen.getByRole('heading', { name: 'Country 24' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Country 25' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show more' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show more' }));

    expect(
      screen.getByRole('heading', { name: 'Country 30' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Show more' }),
    ).not.toBeInTheDocument();
  });

  it('filters rendered countries when typing in search', async () => {
    const user = userEvent.setup();

    useCountriesMock.mockReturnValue({
      countries,
      errorMessage: null,
      status: 'success',
    });

    renderHomePage();

    await user.type(
      screen.getByRole('searchbox', { name: 'Search for a country' }),
      'ger',
    );

    expect(screen.getByRole('heading', { name: 'Germany' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Brazil' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Japan' })).not.toBeInTheDocument();
  });

  it('filters rendered countries when selecting a region', async () => {
    const user = userEvent.setup();

    useCountriesMock.mockReturnValue({
      countries,
      errorMessage: null,
      status: 'success',
    });

    renderHomePage();

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filter by region' }),
      'Asia',
    );

    expect(screen.getByRole('heading', { name: 'Japan' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Brazil' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Germany' }),
    ).not.toBeInTheDocument();
  });

  it('resets back to the initial batch when filters change', async () => {
    const user = userEvent.setup();

    useCountriesMock.mockReturnValue({
      countries: manyCountries,
      errorMessage: null,
      status: 'success',
    });

    renderHomePage();

    await user.click(screen.getByRole('button', { name: 'Show more' }));

    expect(
      screen.getByRole('heading', { name: 'Country 30' }),
    ).toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filter by region' }),
      'Asia',
    );

    expect(screen.getByRole('heading', { name: 'Country 27' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Show more' }),
    ).not.toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filter by region' }),
      'Europe',
    );

    expect(
      screen.queryByRole('heading', { name: 'Country 25' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show more' }),
    ).toBeInTheDocument();
  });
});
