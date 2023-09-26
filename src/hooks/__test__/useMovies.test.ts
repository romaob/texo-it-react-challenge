import fetchMock from 'jest-fetch-mock';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useMovies } from '../useMovies';
import { URL } from '../../utils/api';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('useMovies hook test', () => {
  it('should return the list of movies using the default values', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useMovies());
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe(null);
    expect(result.current.response).toEqual({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=15');
  });

  it('should return the list of movies after changing the page', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useMovies());
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe(null);
    expect(result.current.response).toEqual({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=15');

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=2&size=15');
  });

  it('should return the list of movies filtering by year after changing the year', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useMovies());
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe(null);
    expect(result.current.response).toEqual({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=15');

    act(() => {
      result.current.setYear(1980);
    });

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.current.yearFilter).toBe(1980);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=15&year=1980');
  });

  it('should return the list of movies filtering by winner after changing the winner', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useMovies());
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe(null);
    expect(result.current.response).toEqual({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=15');

    act(() => {
      result.current.setWinner(true);
    });

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=15&winner=true');
  });

  it('should call the refetch function when running the refetch', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useMovies());
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe(null);
    expect(result.current.response).toEqual({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=15');

    act(() => {
      result.current.refetch();
    });

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=15');
  });
});
