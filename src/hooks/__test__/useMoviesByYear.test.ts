import fetchMock from 'jest-fetch-mock';
import { act, renderHook, waitFor } from '@testing-library/react';
import { URL } from '../../utils/api';
import { useMoviesByYear } from '../useMoviesByYear';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('useMoviesByYear hook test', () => {
  it('should render the hook without fetching or loading any data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useMoviesByYear());
    expect(result.current.loading).toBe(false);
  });

  it('should return the list of movies filtering by year after changing the year', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useMoviesByYear());
    act(() => {
      result.current.setYear(1980);
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?winner=true&year=1980');
  });

  it('should return the list after calling the refetch function', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useMoviesByYear());
    act(() => {
      result.current.setYear(1980);
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?winner=true&year=1980');

    act(() => {
      result.current.refetch();
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?winner=true&year=1980');
  });
});
