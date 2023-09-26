import fetchMock from 'jest-fetch-mock';
import { renderHook, waitFor } from '@testing-library/react';
import { URL } from '../../utils/api';
import { useProducersMinMaxInterval } from '../useProducersMinMaxInterval';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('useProducersMinMaxInterval hook test', () => {
  it('should render the hook without fetching or loading any data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const { result } = renderHook(() => useProducersMinMaxInterval());
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe(null);
    expect(result.current.response).toEqual({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      URL + '?projection=max-min-win-interval-for-producers'
    );
  });
});
