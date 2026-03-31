import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import type {
  BorderCountry,
  CountryDetails,
} from '@/features/countries/models/country';

import { CountryDetailsPage } from './country-details-page';

const useCountryDetailsMock = vi.fn();

vi.mock('@/features/countries/hooks/use-country-details', () => ({
  useCountryDetails: (code: string) => useCountryDetailsMock(code),
}));

const country: CountryDetails = {
  borderCountryCodes: ['FRA', 'DEU'],
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

const borderCountries: BorderCountry[] = [
  {
    code: 'FRA',
    name: 'France',
  },
  {
    code: 'DEU',
    name: 'Germany',
  },
];

function renderCountryDetailsPage(initialEntry = '/country/BRA') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/country/:code" element={<CountryDetailsPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('CountryDetailsPage', () => {
  beforeEach(() => {
    useCountryDetailsMock.mockReset();
  });

  it('renders the loading state', () => {
    useCountryDetailsMock.mockReturnValue({
      borderCountries: [],
      country: null,
      errorMessage: null,
      status: 'loading',
    });

    renderCountryDetailsPage();

    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
  });

  it('renders the error state', () => {
    useCountryDetailsMock.mockReturnValue({
      borderCountries: [],
      country: null,
      errorMessage: 'Failed to fetch country details.',
      status: 'error',
    });

    renderCountryDetailsPage();

    expect(
      screen.getByRole('heading', { name: 'Unable to load country' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Failed to fetch country details.'),
    ).toBeInTheDocument();
  });

  it('renders the not-found state', () => {
    useCountryDetailsMock.mockReturnValue({
      borderCountries: [],
      country: null,
      errorMessage: 'Country "BRA" was not found.',
      status: 'not-found',
    });

    renderCountryDetailsPage();

    expect(
      screen.getByRole('heading', { name: 'Country not found' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Country "BRA" was not found.')).toBeInTheDocument();
  });

  it('renders country details in the success state', () => {
    useCountryDetailsMock.mockReturnValue({
      borderCountries: [],
      country,
      errorMessage: null,
      status: 'success',
    });

    renderCountryDetailsPage();

    expect(screen.getByRole('heading', { name: 'Brazil' })).toBeInTheDocument();
    expect(screen.getByText('Brasil')).toBeInTheDocument();
    expect(screen.getByText('203,062,512')).toBeInTheDocument();
    expect(screen.getByText('Brazilian real')).toBeInTheDocument();
  });

  it('renders border countries when present', () => {
    useCountryDetailsMock.mockReturnValue({
      borderCountries,
      country,
      errorMessage: null,
      status: 'success',
    });

    renderCountryDetailsPage();

    expect(
      screen.getByRole('heading', { name: 'Border Countries:' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'France' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Germany' })).toBeInTheDocument();
  });

  it('passes the route param into useCountryDetails', () => {
    useCountryDetailsMock.mockReturnValue({
      borderCountries: [],
      country,
      errorMessage: null,
      status: 'success',
    });

    renderCountryDetailsPage('/country/BRA');

    expect(useCountryDetailsMock).toHaveBeenCalledWith('BRA');
  });
});

