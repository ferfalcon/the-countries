import { renderHook, waitFor } from '@testing-library/react';

import { useCountryDetails } from './use-country-details';

function createJsonResponse<T>(
  data: T,
  init: { ok?: boolean; status?: number } = {},
): Response {
  return {
    json: async () => data,
    ok: init.ok ?? true,
    status: init.status ?? 200,
  } as Response;
}

describe('useCountryDetails', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns a not-found state immediately when the code is empty', () => {
    const { result } = renderHook(() => useCountryDetails(''));

    expect(result.current.status).toBe('not-found');
    expect(result.current.country).toBeNull();
    expect(result.current.borderCountries).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('loads, maps, and sorts country details and border countries', async () => {
    fetchMock
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            borders: ['FRA', 'DEU'],
            capital: ['Brussels'],
            cca3: 'BEL',
            currencies: {
              EUR: {
                name: 'Euro',
              },
            },
            flags: {
              alt: 'Flag of Belgium',
              svg: 'https://flagcdn.com/be.svg',
            },
            languages: {
              deu: 'German',
              fra: 'French',
              nld: 'Dutch',
            },
            name: {
              common: 'Belgium',
              nativeName: {
                nld: {
                  common: 'Belgie',
                },
              },
            },
            population: 11555997,
            region: 'Europe',
            subregion: 'Western Europe',
            tld: ['.be'],
          },
        ]),
      )
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            cca3: 'DEU',
            name: {
              common: 'Germany',
            },
          },
          {
            cca3: 'FRA',
            name: {
              common: 'France',
            },
          },
        ]),
      );

    const { result } = renderHook(() => useCountryDetails('bel'));

    expect(result.current.status).toBe('loading');

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[0]).toContain('/v3.1/alpha/bel?fields=');
    expect(fetchMock.mock.calls[1]?.[0]).toContain('/v3.1/alpha?codes=FRA,DEU');
    expect(result.current.country).toEqual({
      borderCountryCodes: ['FRA', 'DEU'],
      capital: 'Brussels',
      code: 'BEL',
      currencies: ['Euro'],
      flagAlt: 'Flag of Belgium',
      flagUrl: 'https://flagcdn.com/be.svg',
      languages: ['German', 'French', 'Dutch'],
      name: 'Belgium',
      nativeName: 'Belgie',
      population: 11555997,
      region: 'Europe',
      subregion: 'Western Europe',
      topLevelDomain: '.be',
    });
    expect(result.current.borderCountries).toEqual([
      {
        code: 'FRA',
        name: 'France',
      },
      {
        code: 'DEU',
        name: 'Germany',
      },
    ]);
    expect(result.current.errorMessage).toBeNull();
  });

  it('returns a not-found state when the country request returns 404', async () => {
    fetchMock.mockResolvedValue(
      createJsonResponse([], {
        ok: false,
        status: 404,
      }),
    );

    const { result } = renderHook(() => useCountryDetails('missing'));

    await waitFor(() => {
      expect(result.current.status).toBe('not-found');
    });

    expect(result.current.country).toBeNull();
    expect(result.current.borderCountries).toEqual([]);
    expect(result.current.errorMessage).toBe(
      'Country "missing" was not found.',
    );
  });
});

