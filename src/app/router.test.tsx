import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { AppRouter } from '@/app/router';
import { ThemeProvider } from '@/features/theme/theme-provider';
import type { CountrySummary, CountryDetails } from '@/features/countries/models/country';

const useCountriesMock = vi.fn();
const useCountryDetailsMock = vi.fn();

vi.mock('@/features/countries/hooks/use-countries', () => ({
  useCountries: () => useCountriesMock(),
}));

vi.mock('@/features/countries/hooks/use-country-details', () => ({
  useCountryDetails: (code: string) => useCountryDetailsMock(code),
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
];

const countryDetails: CountryDetails = {
  borderCountryCodes: [],
  capital: 'Brasilia',
  code: 'BRA',
  currencies: ['Brazilian real'],
  flagAlt: 'Flag of Brazil',
  flagUrl: 'https://flagcdn.com/br.svg',
  languages: ['Portuguese'],
  name: 'Brazil',
  nativeName: 'Brasil',
  population: 203062512,
  region: 'Americas',
  subregion: 'South America',
  topLevelDomain: '.br',
};

function renderRouter(initialEntry: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppRouter />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('AppRouter', () => {
  beforeEach(() => {
    useCountriesMock.mockReset();
    useCountryDetailsMock.mockReset();
  });

  it('renders the shared header and home page at /', () => {
    useCountriesMock.mockReturnValue({
      countries: [],
      errorMessage: null,
      status: 'success',
    });
    useCountryDetailsMock.mockReturnValue({
      borderCountries: [],
      country: null,
      errorMessage: null,
      status: 'not-found',
    });

    renderRouter('/');

    expect(
      screen.getByRole('link', { name: 'Where in the world?' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('searchbox', { name: 'Search for a country' }),
    ).toBeInTheDocument();
  });

  it('renders the shared header and country details page at /country/BRA', () => {
    useCountriesMock.mockReturnValue({
      countries: [],
      errorMessage: null,
      status: 'success',
    });
    useCountryDetailsMock.mockReturnValue({
      borderCountries: [],
      country: countryDetails,
      errorMessage: null,
      status: 'success',
    });

    renderRouter('/country/BRA');

    expect(
      screen.getByRole('link', { name: 'Where in the world?' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Brazil' })).toBeInTheDocument();
  });

  it('navigates from a country card on / to the country details route', async () => {
    const user = userEvent.setup();

    useCountriesMock.mockReturnValue({
      countries,
      errorMessage: null,
      status: 'success',
    });
    useCountryDetailsMock.mockImplementation((code: string) => ({
      borderCountries: [],
      country: code === 'BRA' ? countryDetails : null,
      errorMessage: null,
      status: code === 'BRA' ? 'success' : 'not-found',
    }));

    renderRouter('/');

    await user.click(screen.getByRole('link', { name: /Brazil/i }));

    expect(useCountryDetailsMock).toHaveBeenCalledWith('BRA');
    expect(screen.getByRole('heading', { name: 'Brazil' })).toBeInTheDocument();
    expect(screen.getByText('Brasil')).toBeInTheDocument();
  });
});

