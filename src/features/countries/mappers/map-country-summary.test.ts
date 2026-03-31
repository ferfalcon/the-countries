import type { RawCountrySummary } from '@/features/countries/models/raw-country';

import { mapCountrySummary } from './map-country-summary';

describe('mapCountrySummary', () => {
  it('maps valid raw API data correctly', () => {
    const rawCountry: RawCountrySummary = {
      cca2: 'BR',
      cca3: 'BRA',
      capital: ['Brasilia'],
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
      cca2: 'AQ',
      cca3: 'ATA',
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

  it('builds safe flag alt text and derives the summary flag url locally', () => {
    const rawCountry: RawCountrySummary = {
      cca2: 'JP',
      cca3: 'JPN',
      capital: ['Tokyo'],
      name: {
        common: 'Japan',
      },
      population: 125836021,
      region: 'Asia',
    };

    expect(mapCountrySummary(rawCountry).flagAlt).toBe('Flag of Japan');
    expect(mapCountrySummary(rawCountry).flagUrl).toBe(
      'https://flagcdn.com/jp.svg',
    );
  });
});
