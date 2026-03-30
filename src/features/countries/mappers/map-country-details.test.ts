import type { RawCountryDetails } from '@/features/countries/models/raw-country';

import { mapCountryDetails } from './map-country-details';

describe('mapCountryDetails', () => {
  it('maps valid raw API data correctly', () => {
    const rawCountry: RawCountryDetails = {
      borders: ['ARG', 'BOL', 'COL'],
      capital: ['Brasilia'],
      cca3: 'BRA',
      currencies: {
        BRL: {
          name: 'Brazilian real',
        },
      },
      flags: {
        alt: 'Flag of Brazil',
        svg: 'https://flagcdn.com/br.svg',
      },
      languages: {
        por: 'Portuguese',
      },
      name: {
        common: 'Brazil',
        nativeName: {
          por: {
            common: 'Brasil',
          },
        },
      },
      population: 203062512,
      region: 'Americas',
      subregion: 'South America',
      tld: ['.br'],
    };

    expect(mapCountryDetails(rawCountry)).toEqual({
      code: 'BRA',
      name: 'Brazil',
      nativeName: 'Brasil',
      population: 203062512,
      region: 'Americas',
      subregion: 'South America',
      capital: 'Brasilia',
      topLevelDomain: '.br',
      currencies: ['Brazilian real'],
      languages: ['Portuguese'],
      borderCountryCodes: ['ARG', 'BOL', 'COL'],
      flagAlt: 'Flag of Brazil',
      flagUrl: 'https://flagcdn.com/br.svg',
    });
  });

  it('maps currencies and languages correctly', () => {
    const rawCountry: RawCountryDetails = {
      cca3: 'ZAF',
      currencies: {
        NAD: {
          name: 'Namibian dollar',
        },
        ZAR: {
          name: 'South African rand',
        },
      },
      flags: {
        svg: 'https://flagcdn.com/za.svg',
      },
      languages: {
        afr: 'Afrikaans',
        eng: 'English',
        nbl: 'Southern Ndebele',
      },
      name: {
        common: 'South Africa',
      },
      population: 59308690,
      region: 'Africa',
      tld: ['.za'],
    };

    expect(mapCountryDetails(rawCountry).currencies).toEqual([
      'Namibian dollar',
      'South African rand',
    ]);
    expect(mapCountryDetails(rawCountry).languages).toEqual([
      'Afrikaans',
      'English',
      'Southern Ndebele',
    ]);
  });

  it('applies fallbacks for missing fields', () => {
    const rawCountry: RawCountryDetails = {
      cca3: 'ATA',
      flags: {
        svg: 'https://flagcdn.com/aq.svg',
      },
      name: {
        common: 'Antarctica',
      },
      population: 0,
      region: '',
      tld: [],
    };

    expect(mapCountryDetails(rawCountry)).toEqual({
      code: 'ATA',
      name: 'Antarctica',
      nativeName: 'Antarctica',
      population: 0,
      region: '',
      subregion: null,
      capital: null,
      topLevelDomain: null,
      currencies: [],
      languages: [],
      borderCountryCodes: [],
      flagAlt: 'Flag of Antarctica',
      flagUrl: 'https://flagcdn.com/aq.svg',
    });
  });

  it('handles missing borders safely', () => {
    const rawCountry: RawCountryDetails = {
      cca3: 'ISL',
      capital: ['Reykjavik'],
      flags: {
        svg: 'https://flagcdn.com/is.svg',
      },
      name: {
        common: 'Iceland',
      },
      population: 376248,
      region: 'Europe',
      tld: ['.is'],
    };

    expect(mapCountryDetails(rawCountry).borderCountryCodes).toEqual([]);
  });
});

