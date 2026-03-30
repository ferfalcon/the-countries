import type { RawCountrySummary } from '@/features/countries/models/raw-country';

import { mapCountrySummary } from './map-country-summary';

describe('mapCountrySummary', () => {
  it('maps valid raw API data correctly', () => {
    const rawCountry: RawCountrySummary = {
      cca3: 'BRA',
      capital: ['Brasilia'],
      flags: {
        alt: 'Flag of Brazil',
        svg: 'https://flagcdn.com/br.svg',
      },
      name: {
        common: 'Brazil',
      },
      population: 203062512,
      region: 'Americas',
    };

    expect(mapCountrySummary(rawCountry)).toEqual({
      code: 'BRA',
      name: 'Brazil',
      population: 203062512,
      region: 'Americas',
      capital: 'Brasilia',
      flagAlt: 'Flag of Brazil',
      flagUrl: 'https://flagcdn.com/br.svg',
    });
  });

  it('applies fallbacks for missing fields', () => {
    const rawCountry: RawCountrySummary = {
      cca3: 'ATA',
      flags: {
        svg: 'https://flagcdn.com/aq.svg',
      },
      name: {
        common: 'Antarctica',
      },
      population: 0,
      region: '',
    };

    expect(mapCountrySummary(rawCountry)).toEqual({
      code: 'ATA',
      name: 'Antarctica',
      population: 0,
      region: '',
      capital: null,
      flagAlt: 'Flag of Antarctica',
      flagUrl: 'https://flagcdn.com/aq.svg',
    });
  });

  it('builds safe flag alt text when the API does not provide one', () => {
    const rawCountry: RawCountrySummary = {
      cca3: 'JPN',
      capital: ['Tokyo'],
      flags: {
        svg: 'https://flagcdn.com/jp.svg',
      },
      name: {
        common: 'Japan',
      },
      population: 125836021,
      region: 'Asia',
    };

    expect(mapCountrySummary(rawCountry).flagAlt).toBe('Flag of Japan');
  });
});

