import type { CountrySummary } from '@/features/countries/models/country';

import { filterCountries } from './filter-countries';

const countries: CountrySummary[] = [
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
    code: 'GHA',
    name: 'Ghana',
    population: 33475870,
    region: 'Africa',
    capital: 'Accra',
    flagAlt: 'Flag of Ghana',
    flagUrl: 'https://flagcdn.com/gh.svg',
  },
  {
    code: 'GRL',
    name: 'Greenland',
    population: 56367,
    region: 'Americas',
    capital: 'Nuuk',
    flagAlt: 'Flag of Greenland',
    flagUrl: 'https://flagcdn.com/gl.svg',
  },
];

describe('filterCountries', () => {
  it('filters by search term', () => {
    expect(
      filterCountries(countries, {
        region: '',
        searchTerm: 'green',
      }),
    ).toEqual([countries[2]]);
  });

  it('filters by region', () => {
    expect(
      filterCountries(countries, {
        region: 'Africa',
        searchTerm: '',
      }),
    ).toEqual([countries[1]]);
  });

  it('combines search term and region filters', () => {
    expect(
      filterCountries(countries, {
        region: 'Europe',
        searchTerm: 'ger',
      }),
    ).toEqual([countries[0]]);
  });

  it('matches countries case-insensitively', () => {
    expect(
      filterCountries(countries, {
        region: '',
        searchTerm: 'GHA',
      }),
    ).toEqual([countries[1]]);
  });

  it('returns all countries when filters are empty', () => {
    expect(
      filterCountries(countries, {
        region: '',
        searchTerm: '   ',
      }),
    ).toEqual(countries);
  });
});

