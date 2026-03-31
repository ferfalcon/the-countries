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
});
