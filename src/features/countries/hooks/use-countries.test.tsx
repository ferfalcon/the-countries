import { renderHook, waitFor } from '@testing-library/react';

import { useCountries } from './use-countries';

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

describe('useCountries', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads and maps countries from the API', async () => {
    fetchMock.mockResolvedValue(
      createJsonResponse([
        {
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
        },
      ]),
    );

    const { result } = renderHook(() => useCountries());

    expect(result.current.status).toBe('loading');
    expect(result.current.countries).toEqual([]);

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toContain('/v3.1/all?fields=');
    expect(fetchMock.mock.calls[0]?.[1]).toEqual(
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result.current.countries).toEqual([
      {
        capital: 'Brasilia',
        code: 'BRA',
        flagAlt: 'Flag of Brazil',
        flagUrl: 'https://flagcdn.com/br.svg',
        name: 'Brazil',
        population: 203062512,
        region: 'Americas',
      },
    ]);
    expect(result.current.errorMessage).toBeNull();
  });

  it('surfaces an error message when the request fails', async () => {
    fetchMock.mockResolvedValue(
      createJsonResponse([], {
        ok: false,
        status: 500,
      }),
    );

    const { result } = renderHook(() => useCountries());

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.countries).toEqual([]);
    expect(result.current.errorMessage).toBe('Failed to fetch countries.');
  });
});

